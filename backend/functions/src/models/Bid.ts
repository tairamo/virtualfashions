import * as mongoose from 'mongoose'
import { AUCTION, BID, USER } from '../constants'
import { BidDoc } from '../interfaces/BidDoc'

const Schema = mongoose.Schema

const bidSchema = new Schema<BidDoc>(
  {
    auctionId: {
      type: Schema.Types.ObjectId,
      ref: AUCTION,
      require: true
    },
    bidETH: {
      type: Schema.Types.Number,
      require: true
    },
    bidUSD: {
      type: Schema.Types.Number,
      require: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: USER,
      require: true
    },
    chainInfo: {
      type: Object
    }
  },
  {
    timestamps: true
  }
)

export const BidModel = mongoose.model<BidDoc>(BID, bidSchema)
