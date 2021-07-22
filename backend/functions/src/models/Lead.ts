import * as mongoose from 'mongoose'
import { LEAD } from '../constants'
import { LeadDoc } from '../interfaces/LeadDoc'

const Schema = mongoose.Schema

const LeadSchema = new Schema<LeadDoc>(
  {
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const LeadModel = mongoose.model<LeadDoc>(LEAD, LeadSchema)
