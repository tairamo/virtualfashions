import * as mongoose from 'mongoose'

export interface SettingDoc {
  _id: mongoose.Types.ObjectId
  name?: string
  value?: string
}
