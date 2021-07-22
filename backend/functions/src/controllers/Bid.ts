import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import Bid from '../services/Bid'
import { TYPES } from '../services/Container/types'

@injectable()
export class BidController {
  public bidService: Bid

  constructor(@inject(TYPES.ServiceBid) bidService: Bid) {
    this.bidService = bidService
  }

  async createBid(request: Request, response: Response) {
    const { body: data, authUser } = request

    const auction = await this.bidService.createBid(data, authUser)

    return response.json(auction)
  }

  async fetchBids(request: Request, response: Response) {
    const { authUser } = request

    const bids = await this.bidService.fetchBids(authUser._id)

    return response.json(bids)
  }
}
