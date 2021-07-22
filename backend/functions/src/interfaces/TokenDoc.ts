import * as mongoose from 'mongoose'
import { ChainInfo } from './ChainInfo'

export interface TokenDoc extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  title?: string
  url?: string
  contentType?: string
  thumbnailUrl?: Boolean
  thumbnailContentType?: string
  about?: string
  userId: mongoose.Types.ObjectId | Record<string, unknown>
  chainInfo?: ChainInfo
  status?: string
}
