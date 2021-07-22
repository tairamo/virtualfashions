import * as mongoose from 'mongoose'

import { AuctionDoc } from '../interfaces/AuctionDoc'
import { AUCTION, AUCTION_STATUS_ENUM, AUCTION_TYPE_ENUM, TOKEN, USER } from '../constants'

const Schema = mongoose.Schema

const auctionSchema = new Schema<AuctionDoc>(
  {
    tokenId: {
      type: Schema.Types.ObjectId,
      ref: TOKEN,
      require: true
    },
    minimumBid: {
      type: Schema.Types.Number,
      require: true
    },
    biddingEndDate: {
      type: Schema.Types.Date,
      require: true
    },
    type: {
      type: String,
      enum: AUCTION_TYPE_ENUM
    },
    status: {
      type: String,
      enum: AUCTION_STATUS_ENUM
    },
    chainInfo: {
      type: Object
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: USER,
      require: true
    }
  },
  {
    timestamps: true
  }
)

export const AuctionModel = mongoose.model<AuctionDoc>(AUCTION, auctionSchema)
