import * as mongoose from 'mongoose'

import { AuctionResultDoc } from '../interfaces/AuctionResultDoc'
import { AUCTION, BID, AUCTION_RESULT, AUCTION_RESULT_STATUS_ENUM, TOKEN, USER } from '../constants'

const Schema = mongoose.Schema

const auctionResultSchema = new Schema<AuctionResultDoc>(
  {
    auctionId: {
      type: Schema.Types.ObjectId,
      ref: AUCTION,
      require: true
    },
    tokenId: {
      type: Schema.Types.ObjectId,
      ref: TOKEN
    },
    bidId: {
      type: Schema.Types.ObjectId,
      ref: BID
    },
    wonBy: {
      type: Schema.Types.ObjectId,
      ref: USER
    },
    status: {
      type: String,
      enum: AUCTION_RESULT_STATUS_ENUM,
      require: true
    }
  },
  {
    timestamps: true
  }
)

export const AuctionResultModel = mongoose.model<AuctionResultDoc>(AUCTION_RESULT, auctionResultSchema)
