import * as mongoose from 'mongoose'
import { Setting } from '../constants'
import { SettingDoc } from '../interfaces/SettingDoc'

const Schema = mongoose.Schema

const settingSchema = new Schema<SettingDoc>(
  {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const SettingModel = mongoose.model<SettingDoc>(Setting, settingSchema)
