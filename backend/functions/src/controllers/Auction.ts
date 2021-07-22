import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import * as moment from 'moment'

import Auction from '../services/Auction'
import { TYPES } from '../services/Container/types'

@injectable()
export class AuctionController {
  public auctionService: Auction

  constructor(@inject(TYPES.ServiceAuction) auctionService: Auction) {
    this.auctionService = auctionService
  }

  async createAuction(request: Request, response: Response) {
    let { body: data, authUser } = request

    data = { ...data, biddingEndDate: moment.unix(data.biddingEndDate).toDate() }

    const auction = await this.auctionService.createAuction(data, authUser)

    return response.json(auction)
  }

  async fetchAuctions(request: Request, response: Response) {
    const { query } = request
    const { page } = query as { page: string }

    const auctions = await this.auctionService.auctions(page)

    return response.json(auctions)
  }

  async updateAuction(request: Request, response: Response) {
    const { body, params } = request
    const { id } = params

    const auction = await this.auctionService.updateAuction(body, id)
    return response.json(auction)
  }

  // Delete this function
  async updateAuctionWinner(request: Request, response: Response) {
    await this.auctionService.updateAuctionWinner()
    return response.json(true)
  }

  async auctionSettle(request: Request, response: Response) {
    const { body, params, authUser } = request
    const { tokenId, userId, chainInfo } = body

    const result = await this.auctionService.auctionSettle(params.id, userId, tokenId, authUser._id, chainInfo)

    return response.json({ ...result })
  }
}
