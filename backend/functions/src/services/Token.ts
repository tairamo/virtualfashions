import { inject, injectable } from 'inversify'
import { omit } from 'lodash'

import User from './User'
import { DBModel } from './DBModel'
import { TYPES } from './Container/types'
import { TokenModel } from '../models/Token'
import { UserDoc } from '../interfaces/UserDoc'
import { TokenDoc } from '../interfaces/TokenDoc'
import { UserNotFound } from '../errors/UserNotFound'
import { listLimit, objectId } from '../utils/common'
import { NotFoundError } from '../errors/NotFoundError'
import { TokenNotFound } from '../errors/TokenNotFound'
import { matchQuery, Query } from '../interfaces/Query'
import { tokenVerified, tokenVerification } from '../utils/mail'
import { tokensWithActiveAuctions, tokensOwnerOpenAuction, tokensWithoutActivities } from '../utils/queries/queries'
import { USER_PROJECTION, USER_LOOKUP, TOKEN_PENDING_REVIEW, TOKENS_MATCH, TOKEN_COLLECTED_SORT, TOKEN_CREATED_SORT, OWNEDBY_LOOKUP, APP_DOMAIN } from '../constants'

@injectable()
export default class Token extends DBModel {
  private userService: User

  constructor(@inject(TYPES.ServiceUser) userService: User) {
    super(TokenModel)
    this.userService = userService
  }

  async createToken(data: TokenDoc, user: UserDoc) {
    const token = await this.create({ ...data, userId: user._id, ownedBy: user._id, status: TOKEN_PENDING_REVIEW })

    // Find user
    const userDetail = await this.userService.findOne({ _id: user._id })
    if (!userDetail) {
      throw new UserNotFound(user._id.toString())
    }

    // Call token verification to send email
    tokenVerification(userDetail.email, token.title)

    return token
  }

  async updateToken(id: string, data: object) {
    const token = await this.model.findOne(objectId(id))
    if (!token) throw new NotFoundError({ id }, 'Token')
    token.set(omit({ ...token, ...data }, ['_id']))
    return await token.save()
  }

  async tokens(data: Query) {
    const { query, sort } = data
    if (query.userId) {
      query.userId = objectId(query.userId)
    }

    const project = {
      $project: { ...USER_PROJECTION }
    }

    return await this.aggregate(query, null, project, USER_LOOKUP, sort)
  }

  async token(data: Query) {
    const { query } = data

    if (query._id) {
      query._id = objectId(query._id)
    }

    const match: matchQuery = {
      $match: {
        $expr: {
          $and: [{ $eq: ['$_id', query._id] }]
        }
      }
    }

    if (query.username) {
      // Fetch user by username
      const user = await this.userService.findOne({ username: query.username })
      if (!user) throw new UserNotFound(query.username)

      match?.$match?.$expr?.$or?.push({ $eq: ['$ownedBy', user._id] }, { $eq: ['$userId', user._id] })
    }

    const pipelineQuery = {
      $and: [{ $eq: ['$$id', '$tokenId'] }]
    }

    const stages = tokensWithActiveAuctions(pipelineQuery)

    const tokens = await this.model.aggregate([match, ...stages])
    return tokens[0]
  }

  async searchTokens(search: string) {
    const query = { status: 'Approved', title: new RegExp(search, 'i') }
    const projection = { _id: 1, url: 1, title: 1, userId: 1, 'user.username': 1 }

    return await this.aggregate(query, 3, projection, USER_LOOKUP)
  }

  async metadata(id: any) {
    const query = { _id: objectId(id) }
    const token = await this.token({ query })
    const metadata = {
      name: token.title,
      description: token.about,
      image: token.url,
      attributes: [
        {
          trait_type: 'ContentType',
          value: 'Image/Video'
        },
        {
          trait_type: 'ThumbUrl',
          value: token.thumbnailUrl
        }
      ]
    }
    return metadata
  }

  async createdTokenList(data: Query) {
    const { query } = data
    const currPage = parseInt(query.page || '1')

    if (query.userId) {
      query.userId = objectId(query.userId)
    }

    // Created tokens
    const createdTokensPipelineQuery = {
      $and: [TOKENS_MATCH, { $eq: ['$createdBy', query.userId] }]
    }

    const sort = TOKEN_CREATED_SORT
    const limit = listLimit(12, currPage)
    const createdMatch = { $match: { userId: query.userId, status: 'Approved' } }
    const createdTokensStages = tokensWithActiveAuctions(createdTokensPipelineQuery)
    const facet = {
      $facet: {
        documents: [...createdTokensStages, sort, limit],
        counts: [{ $count: 'totalDocuments' }]
      }
    }

    const result = await this.model.aggregate([createdMatch, facet])
    const createdTokens = result[0].documents
    const totalDocuments = result[0].counts[0]?.totalDocuments || 0

    return {
      currPage,
      createdTokens,
      totalDocuments
    }
  }

  async collectedTokenList(data: Query) {
    const { query } = data
    const currPage = parseInt(query.page || '1')

    if (query.userId) {
      query.userId = objectId(query.userId)
    }

    // Collected tokens
    const collectedTokensPipelineQuery = {
      $and: [TOKENS_MATCH, { $eq: ['$status', 'Close'] }]
    }

    const collectedTokensOpenAuction = {
      $and: [TOKENS_MATCH, { $eq: ['$status', 'Open'] }, { $eq: ['$createdBy', query.userId] }]
    }

    const sort = TOKEN_COLLECTED_SORT
    const limit = listLimit(12, currPage)
    const openAuctionStages = tokensOwnerOpenAuction(collectedTokensOpenAuction)
    const collectedTokensStages = tokensWithActiveAuctions(collectedTokensPipelineQuery)
    const collectedMatch = { $match: { $expr: { $and: [{ $eq: ['$ownedBy', query.userId] }, { $ne: ['$userId', query.userId] }, { $eq: ['$status', 'Approved'] }] } } }
    const facet = {
      $facet: {
        documents: [...collectedTokensStages, ...openAuctionStages, sort, limit],
        counts: [{ $count: 'totalDocuments' }]
      }
    }

    const result = await this.model.aggregate([collectedMatch, facet])
    const collectedTokens = result[0].documents
    const totalDocuments = result[0].counts[0]?.totalDocuments || 0

    return {
      currPage,
      collectedTokens,
      totalDocuments
    }
  }

  // Admin
  async tokenListAdmin(page: string) {
    const perPage = 10
    const currPage = parseInt(page)
    const pipelineQuery = { $and: [{ $eq: ['$$id', '$tokenId'] }] }

    const stages = tokensWithoutActivities(pipelineQuery)
    const sort = { $sort: { createdAt: -1 } }
    const skip = { $skip: perPage * (currPage - 1) }
    const limit = { $limit: perPage }

    const facet = {
      $facet: {
        documents: [...stages, sort, skip, limit],
        count: [{ $count: 'totalDocuments' }]
      }
    }

    const result = await this.model.aggregate([facet])

    const tokens = result[0].documents
    const totalDocuments = result[0].count[0].totalDocuments

    return {
      tokens,
      totalDocuments
    }
  }

  // Admin
  async tokenVerified(id: string) {
    const tokenId = objectId(id)

    const project = { title: 1, 'ownedBy.username': 1, 'ownedBy.email': 1 }

    const tokens = await this.aggregate({ _id: tokenId }, null, project, OWNEDBY_LOOKUP)

    if (!tokens[0]) {
      throw new TokenNotFound(id)
    }

    const token = tokens[0]
    const profileLink = `${APP_DOMAIN}/${token.ownedBy?.username}`

    // Call token verification to send email
    tokenVerified(token.ownedBy?.email, token.title, profileLink)

    return { message: 'Mail sent' }
  }
}
