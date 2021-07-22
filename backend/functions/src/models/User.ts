import * as mongoose from 'mongoose'
import { USER } from '../constants'
import { UserDoc } from '../interfaces/UserDoc'

const Schema = mongoose.Schema

const userSchema = new Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    fullname: {
      type: String,
      required: true
    },
    bio: { type: String },
    isCreator: { type: Boolean },
    profileUrl: { type: String },
    bannerUrl: { type: String },
    socials: {
      instagram: { type: String },
      twitter: { type: String },
      website: { type: String },
      pornhub: { type: String },
      'only-fans': { type: String }
    },
    role: { type: String },
    resetToken: { type: String },
    resetTokenUsed: { type: Boolean }
  },
  {
    timestamps: true
  }
)

// userSchema.index({ username: 'text', fullname: 'text' })

export const UserModel = mongoose.model<UserDoc>(USER, userSchema)
