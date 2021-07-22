import * as mongoose from 'mongoose'
import { ChainInfo } from './ChainInfo'

export interface BidDoc extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  auctionId: mongoose.Types.ObjectId
  bidETH: number
  bidUSD: number
  createdBy: mongoose.Types.ObjectId
  chainInfo?: ChainInfo
}
