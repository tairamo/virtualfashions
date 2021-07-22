import * as mongoose from 'mongoose'
import { TOKEN, USER, ACTIVITY } from '../constants'
import { ActivityDoc } from '../interfaces/ActivityDoc'

const Schema = mongoose.Schema

const activitySchema = new Schema<ActivityDoc>(
  {
    tokenId: {
      type: Schema.Types.ObjectId,
      ref: TOKEN,
      require: true
    },
    event: {
      type: String,
      require: true
    },
    data: {
      type: Object
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: USER,
      require: true
    }
  },
  {
    timestamps: true
  }
)

export const ActivityModel = mongoose.model<ActivityDoc>(ACTIVITY, activitySchema)
