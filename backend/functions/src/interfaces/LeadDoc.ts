import * as mongoose from 'mongoose'

export interface LeadDoc {
  _id: mongoose.Types.ObjectId
  email: string
}
