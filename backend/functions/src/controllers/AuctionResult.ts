import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import AuctionResult from '../services/AuctionResult'
import { TYPES } from '../services/Container/types'

@injectable()
export class AuctionResultController {
  public auctionResultService: AuctionResult

  constructor(@inject(TYPES.ServiceAuctionResult) auctionResultService: AuctionResult) {
    this.auctionResultService = auctionResultService
  }

  async auctionResult(request: Request, response: Response) {
    const { params } = request
    const query = { auctionId: params.auctionId }

    const auctionResults = await this.auctionResultService.auctionResult({ query })
    return response.json(auctionResults[0])
  }
}
