import * as mongoose from 'mongoose'
import { TokenDoc } from '../interfaces/TokenDoc'
import { TOKEN, TOKEN_STATUS_ENUM, USER } from '../constants'

const Schema = mongoose.Schema

const tokenSchema = new Schema<TokenDoc>(
  {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    contentType: {
      type: String,
      required: true
    },
    thumbnailUrl: {
      type: String,
      required: true
    },
    thumbnailContentType: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER,
      require: true
    },
    status: {
      type: String,
      enum: TOKEN_STATUS_ENUM
    },
    chainInfo: {
      type: Object
    },
    ownedBy: {
      type: Schema.Types.ObjectId,
      ref: USER
    }
  },
  {
    timestamps: true
  }
)

export const TokenModel = mongoose.model<TokenDoc>(TOKEN, tokenSchema)
