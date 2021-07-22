import * as mongoose from 'mongoose'

export interface UserDoc {
  _id: mongoose.Types.ObjectId
  email?: string
  passoword?: string
  username?: string
  bio?: string
  fullname?: string
  isCreator?: Boolean
  profileUrl?: string
  bannerUrl?: string
  socials?: {
    instagram: string
    twitter: string
    website: string
    pornhub: string
    'only-fans': string
  }
  role?: string
}
