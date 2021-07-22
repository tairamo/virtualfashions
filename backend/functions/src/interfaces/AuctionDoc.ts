import * as mongoose from 'mongoose'
import { ChainInfo } from './ChainInfo'

export interface AuctionDoc extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  tokenId: mongoose.Types.ObjectId
  minimumBid: number
  biddingEndDate: Date
  status: string
  chainInfo?: ChainInfo
  createdBy: mongoose.Types.ObjectId
}
