import { injectable } from 'inversify'

import { DBModel } from './DBModel'
import { objectId } from '../utils/common'
import { AuctionResultModel } from '../models/AuctionResult'
import { AuctionResultDoc } from '../interfaces/AuctionResultDoc'
import { auctionsResultWithBid } from '../utils/queries/auctionResult'
import { Query } from '../interfaces/Query'

@injectable()
export default class AuctionResult extends DBModel {
  constructor() {
    super(AuctionResultModel)
  }

  async createAuctionResult(auctionId: string, status: string, tokenId: string, bidId?: string, wonBy?: string): Promise<AuctionResultDoc> {
    const query = {
      auctionId,
      status,
      tokenId,
      bidId,
      wonBy
    }

    // Created auction result
    return await this.create(query)
  }

  async auctionResult(data: Query) {
    const { query, sort } = data

    const pipelineQuery = {
      $and: [{ $eq: ['$$tokenId', '$_id'] }]
    }

    if (query.auctionId) {
      query.auctionId = objectId(query.auctionId)
    }

    if (query.wonBy) {
      query.wonBy = objectId(query.wonBy)

      pipelineQuery.$and.push({ $eq: [query.wonBy, '$ownedBy'] })
    }

    const match = { $match: { ...query } }
    const statges = auctionsResultWithBid(pipelineQuery, 'ownedBy')

    if (sort) {
      return await this.model.aggregate([match, ...statges, sort])
    }

    return await this.model.aggregate([match, ...statges])
  }
}
