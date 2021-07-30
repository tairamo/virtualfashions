import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import User from '../services/User'
import Token from '../services/Token'
import { TYPES } from '../services/Container/types'
import Activity from '../services/Activity'
import { EventTypes, SEARCH_REGEX } from '../constants'

@injectable()
export class TokenController {
  public tokenService: Token
  public userService: User
  public activityService: Activity

  constructor(@inject(TYPES.ServiceToken) tokenService: Token, @inject(TYPES.ServiceUser) userService: User, @inject(TYPES.ServiceActivity) activityService: Activity) {
    this.tokenService = tokenService
    this.userService = userService
    this.activityService = activityService
  }

  async createToken(request: Request, response: Response) {
    const { body: data, authUser } = request

    const token = await this.tokenService.createToken(data, authUser)

    return response.json(token)
  }

  async updateToken(request: Request, response: Response) {
    const {
      body: data,
      authUser,
      params: { id }
    } = request

    const token = await this.tokenService.updateToken(id, data)

    // Update activity
    await this.activityService.createActivity(token, EventTypes.TOKEN_MINTED, authUser, { chainInfo: token.chainInfo })

    return response.json(token)
  }

  async fetchCreatedTokens(request: Request, response: Response) {
    const { query } = request

    const tokens = await this.tokenService.createdTokenList({ query })

    return response.json(tokens)
  }

  async fetchCollectedTokens(request: Request, response: Response) {
    const { query } = request

    const tokens = await this.tokenService.collectedTokenList({ query })

    return response.json(tokens)
  }

  async fetchToken(request: Request, response: Response) {
    const { params } = request
    const query = { _id: params.id, username: params.username }

    const result = await this.tokenService.token({ query })

    return response.json(result)
  }

  async fetchMetadata(request: Request, response: Response) {
    const { params } = request

    const metadata = await this.tokenService.metadata(params.id)

    return response.json(metadata)
  }

  async search(request: Request, response: Response) {
    const { query } = request
    let search = (query as { search: string }).search

    if (SEARCH_REGEX.test(search)) {
      search = search.replace(SEARCH_REGEX, '')
    }

    // User
    const users = await this.userService.searchUsers(search)

    // Token
    const tokens = await this.tokenService.searchTokens(search)

    return response.json({ users: users, tokens: tokens })
  }

  // Admin
  async fetchTokensAdmin(request: Request, response: Response) {
    const { query } = request
    const { page } = query as { page: string }

    const tokens = await this.tokenService.tokenListAdmin(page)

    return response.json(tokens)
  }

  // Admin
  async fetchTokenAdmin(request: Request, response: Response) {
    const { params } = request
    const query = { _id: params.id, username: params.username }

    const result = await this.tokenService.token({ query })

    return response.json(result)
  }

  // Admin
  async updateTokenAdmin(request: Request, response: Response) {
    const {
      body: data,
      params: { id }
    } = request

    const token = await this.tokenService.updateToken(id, data)

    return response.json(token)
  }

  // Admin
  async tokenVerified(request: Request, response: Response) {
    const {
      params: { id }
    } = request

    const result = await this.tokenService.tokenVerified(id)

    return response.json(result)
  }
}
