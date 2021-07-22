import { inject, injectable } from 'inversify'

import Token from './Token'
import Activity from './Activity'
import { DBModel } from './DBModel'
import { TYPES } from './Container/types'
import { objectId } from '../utils/common'
import { Query } from '../interfaces/Query'
import AuctionResult from './AuctionResult'
import { UserDoc } from '../interfaces/UserDoc'
import { AuctionModel } from '../models/Auction'
import { AuctionDoc } from '../interfaces/AuctionDoc'
import { NotFoundError } from '../errors/NotFoundError'
import { BadRequestError } from '../errors/BadRequestError'
import { auctionEnded, auctionWonEmail } from '../utils/mail'
import { auctionsWithTokensAndBids } from '../utils/queries/auctionQuery'
import { AUCTION_OPEN, ERRORS, EventTypes, AUCTION_RESULT_UNSOLD, AUCTION_RESULT_WON, AUCTION_CLOSE, APP_DOMAIN } from '../constants'

@injectable()
export default class Auction extends DBModel {
  private tokenService: Token
  private activityService: Activity
  private auctionResultService: AuctionResult

  constructor(@inject(TYPES.ServiceToken) tokenService: Token, @inject(TYPES.ServiceActivity) activityService: Activity, @inject(TYPES.ServiceAuctionResult) auctionResultService: AuctionResult) {
    super(AuctionModel)
    this.activityService = activityService
    this.tokenService = tokenService
    this.auctionResultService = auctionResultService
  }

  async createAuction(data: any, user: UserDoc): Promise<AuctionDoc> {
    const token = await this.tokenService.getModel().findOne({ _id: objectId(data.tokenId), ownedBy: user._id })
    if (!token) throw new NotFoundError({ _id: data.tokenId, entity: 'Token' })

    const activeAuction = await this.activeAuction(token._id.toString(), token.ownedBy.toString())
    if (activeAuction) throw new BadRequestError(ERRORS.AUCTION_ALREADY_RUNNING)

    // create auction
    const auctionData = { ...data, status: AUCTION_OPEN, createdBy: user._id }
    const auction = await this.create(auctionData)

    // log activity
    this.activityService.createActivity(token, EventTypes.TOKEN_LISTED, user, { chainInfo: data.chainInfo, auctionId: auction._id })

    return auction
  }

  filterActiveAuction(query: any) {
    query = query.and([{ biddingEndDate: { $gte: new Date() } }, { status: AUCTION_OPEN }])
    return query
  }

  async activeAuction(tokenId: string, userId: string) {
    let query = this.model.findOne({ tokenId: objectId(tokenId), createdBy: objectId(userId) })
    query = this.filterActiveAuction(query)
    const auction = await query.exec()
    return auction
  }

  async activeAuctionById(id: string) {
    let query = this.model
      .findOne({ _id: objectId(id) })
      .populate('tokenId')
      .populate('createdBy')
    query = this.filterActiveAuction(query)
    const auction = await query.exec()
    return auction
  }

  async auctions(page: string) {
    const data: Query = {
      query: {
        status: 'Open',
        biddingEndDate: true
      },
      sort: { biddingEndDate: 1, createdAt: 1 }
    }

    const { query, sort } = data
    const perPage = 16
    const currPage = parseInt(page || '1')

    if (query.biddingEndDate) {
      query.biddingEndDate = { $gt: new Date() }
    }

    const match = { $match: { ...query } }
    const sorting = { $sort: { ...sort } }
    const stages = auctionsWithTokensAndBids()
    const limit = { $limit: perPage * currPage }

    const facet = {
      $facet: {
        documents: [...stages, sorting, limit],
        counts: [{ $count: 'totalDocuments' }]
      }
    }

    const result = await this.model.aggregate([match, facet])
    const auctions = result[0].documents
    const totalDocuments = result[0].counts[0]?.totalDocuments || 0

    return { totalDocuments, auctions, currPage }
  }

  async updateAuction(data: Query, id: string) {
    const { updateData } = data
    const query = { _id: objectId(id), status: 'Open' }

    return await this.findOneAndUpdate(query, updateData)
  }

  async updateAuctionWinner() {
    const promises: any[] = []

    const match = { $match: { status: AUCTION_OPEN, biddingEndDate: { $lt: new Date() } } }
    const stages = auctionsWithTokensAndBids()

    const auctions = await this.model.aggregate([match, ...stages])

    for (const auction of auctions) {
      const { token, bids } = auction
      let bidId: string | undefined,
        wonBy: string | undefined,
        auctionResultStatus = AUCTION_RESULT_UNSOLD

      if (bids.length > 0) {
        auctionResultStatus = AUCTION_RESULT_WON
        const winningBid = bids[0]
        bidId = winningBid._id
        wonBy = winningBid.createdBy?._id

        // Check auction result present in db
        const query = {
          status: AUCTION_RESULT_WON,
          auctionId: objectId(auction._id),
          tokenId: objectId(auction.token._id),
          wonBy: objectId(winningBid.createdBy?._id)
        }

        const result = await this.auctionResultService.findOne(query)
        if (result) continue

        const wonByEmail = winningBid.createdBy?.email
        const auctionCreatedByEmail = auction.createdBy?.email

        const activityPromise = new Promise<void>((resolve, reject) => {
          // log activity
          this.activityService
            .createActivity(token, EventTypes.AUCTION_WON, winningBid.createdBy, { chainInfo: winningBid.chainInfo, auctionId: auction._id, bidId })
            .then(() => resolve())
            .catch(() => reject())
        })

        promises.push(activityPromise)

        promises.push(auctionWonEmail(wonByEmail, token.title, winningBid.bidETH))

        const tokenLink = `${APP_DOMAIN}/${token.user.username}/${token._id}`
        promises.push(auctionEnded(auctionCreatedByEmail, token.title, winningBid.createdBy.username, tokenLink))
      }

      const query = {
        status: auctionResultStatus,
        auctionId: objectId(auction._id),
        tokenId: objectId(auction.token._id)
      }

      // Check auction result present in db
      const auctionResult = await this.auctionResultService.findOne(query)
      if (auctionResult) continue

      const auctionResultPromise = new Promise<void>((resolve, reject) => {
        // log auction results
        this.auctionResultService
          .createAuctionResult(auction._id, auctionResultStatus, auction.token._id, bidId, wonBy)
          .then(() => resolve())
          .catch(() => reject())
      })

      promises.push(auctionResultPromise)
    }

    return Promise.all(promises)
      .then(() => {
        console.log('Completed')
        return 'Job done!'
      })
      .catch(err => {
        console.log(err)
        return 'Job not done!'
      })
  }

  async auctionSettle(auctionId: string, userId: string, tokenId: string, authUserId: string, chainInfo: any) {
    const token_id = objectId(tokenId)
    const auction_id = objectId(auctionId)
    const authUser_id = objectId(authUserId)

    // Update token
    const token = await this.tokenService.findOneAndUpdate({ _id: token_id, ownedBy: { $ne: userId } }, { ownedBy: userId })

    if (!token) {
      return {
        type: 'info',
        message: 'Auction already settled!'
      }
    }

    // Update auction
    await this.findOneAndUpdate({ _id: auction_id }, { status: AUCTION_CLOSE })

    const user: UserDoc = {
      _id: authUser_id
    }

    // log activity
    await this.activityService.createActivity(token, EventTypes.AUCTION_SETTLED, user, { chainInfo, auctionId: auction_id })

    return {
      type: 'success',
      message: 'Auction settled successfully'
    }
  }
}
