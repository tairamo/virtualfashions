import { inject, injectable } from 'inversify'

import { DBModel } from './DBModel'
import { BidModel } from '../models/Bid'
import { UserDoc } from '../interfaces/UserDoc'
import { EventTypes } from '../constants'
import { TYPES } from './Container/types'
import Activity from './Activity'
import { NotFoundError } from '../errors/NotFoundError'
import Auction from './Auction'
import { BidDoc } from '../interfaces/BidDoc'
import { numeric, objectId } from '../utils/common'
import { BadRequestError } from '../errors/BadRequestError'
import { bidsWithTokenAndAuction } from '../utils/queries/bid'

@injectable()
export default class Bid extends DBModel {
  private auctionService: Auction
  private activityService: Activity

  constructor(@inject(TYPES.ServiceAuction) auctionService: Auction, @inject(TYPES.ServiceActivity) activityService: Activity) {
    super(BidModel)
    this.activityService = activityService
    this.auctionService = auctionService
  }

  async createBid(data: any, user: UserDoc): Promise<BidDoc> {
    // check auction active
    const auction = await this.auctionService.activeAuctionById(data.auctionId)
    if (!auction) throw new NotFoundError({ _id: data.auctionId }, 'Auction')

    // check bid is not 0
    if (!numeric(data.bidETH) || !(numeric(data.bidETH) > 0)) throw new BadRequestError('Bid ETH can not be 0')

    // check bid higher than previous bid
    const lastBid = await this.lastBid(auction._id.toString())
    if (lastBid && lastBid.bidETH >= data.bidETH) throw new BadRequestError('Bid must be higher than previous bid')

    const bidData = { ...data, bidETH: numeric(data.bidETH), bidUSD: numeric(data.bidUSD), createdBy: user._id }
    const bid = await this.create(bidData)

    await this.activityService.createActivity(auction.tokenId, EventTypes.BID_SUBMITTED, user, { chainInfo: bid.chainInfo, bidId: bid._id })

    return bid
  }

  async lastBid(auctionId: string) {
    const bid = await this.model
      .find({ auctionId: objectId(auctionId) })
      .sort('-createdAt')
      .limit(1)
      .exec()
    return bid[0] || null
  }

  async fetchBids(userId: string) {
    const user_id = objectId(userId)

    const match = { $match: { createdBy: user_id } }
    const query = bidsWithTokenAndAuction()
    const sort = { $sort: { createdAt: -1 } }

    return await this.model.aggregate([match, ...query, sort])
  }
}
