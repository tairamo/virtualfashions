import * as mongoose from 'mongoose'

export interface AuctionResultDoc extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  tokenId: mongoose.Types.ObjectId
  auctionId: mongoose.Types.ObjectId
  bidId: mongoose.Types.ObjectId
}
