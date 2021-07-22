import * as mongoose from 'mongoose'

export type EventType = 'TOKEN_MINTED' | 'TOKEN_LISTED' | 'AUCTION_BID' | 'AUCTION_WON' | 'AUCTION_SETTLED' | 'TOKEN_TRANSFER'

export interface ActivityDoc extends mongoose.Document {
  _id?: mongoose.Types.ObjectId
  tokenId: mongoose.Types.ObjectId
  event: string
  data: any
  by: mongoose.Types.ObjectId
}
