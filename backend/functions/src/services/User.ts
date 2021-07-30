import { inject, injectable } from 'inversify'

import { DBModel } from './DBModel'
import { TYPES } from './Container/types'
import { UserModel } from '../models/User'
import { Query } from '../interfaces/Query'
import { encryptPassword, verifyPassword } from '../utils/encryption'
import { EmailExistsError } from '../errors/EmailExistsError'
import Auth from './Auth'
import { NotAnAdmin } from '../errors/AdminError'
import { LoginError } from '../errors/LoginError'
import { registrationCompleted } from '../utils/mail'

@injectable()
export default class User extends DBModel {
  private authService: Auth

  constructor(@inject(TYPES.ServiceAuth) authService: Auth) {
    super(UserModel)
    this.authService = authService
  }

  async uniqueUsername(name: string): Promise<string> {
    const username = `${name}${Math.floor(Math.random() * 90000) + 10000}`.replace(new RegExp(' ', 'g'), '-').toLocaleLowerCase()
    const result = await this.findOne({ username })

    // Return unique username
    if (!(result?.docs?.length > 0)) return username

    // If username exist then regenerate username
    return this.uniqueUsername(name)
  }

  async register(data: any) {
    // Get user detail by email
    const userByEmail = await this.findOne({ email: data.email })
    if (userByEmail) throw new EmailExistsError(data.email)

    // Encrypt password
    const hashPassword = await encryptPassword(data.password)
    data.password = hashPassword

    // Generate unique username
    data.username = await this.uniqueUsername(data.fullname)

    // Create user function
    const user = await this.create(data)
    delete user._doc.password

    // Send registration completed mail
    registrationCompleted(user.email)

    return user
  }

  async login(data: any) {
    // Get user detail by email
    const user = await this.findOne({ email: data.email })
    if (!user) throw new LoginError()

    if (data.role && user.role !== data.role) {
      throw new NotAnAdmin()
    }

    // Compare password if user found
    const isMatched = await verifyPassword(data.password, user.password)
    if (!isMatched) {
      throw new LoginError()
    }

    const payload = {
      _id: user._id,
      username: user.username
    }

    // Generate token if user password matched
    const token = this.authService.generateToken(payload)

    delete user.password
    return { user, token }
  }

  async updateOne(uid: any, data: any, options: any) {
    return await this.findOneAndUpdate(uid, data, options)
  }

  async creators(page: string) {
    const perPage = 16
    const currPage = parseInt(page || '1')

    const match = { $match: { isCreator: true } }
    const limit = { $limit: perPage * currPage }
    const projection = { $project: { password: 0, socials: 0, bio: 0, email: 0 } }
    const facet = {
      $facet: {
        documents: [projection, limit],
        counts: [{ $count: 'totalDocuments' }]
      }
    }

    const result = await this.model.aggregate([match, facet])
    const creators = result[0].documents
    const totalDocuments = result[0].counts[0]?.totalDocuments || 0

    return {
      totalDocuments,
      currPage,
      creators
    }
  }

  async users(data: Query) {
    const { query, sort } = data
    return await this.find(query, sort)
  }

  async user(data: { username: string }) {
    return await this.findOne(data)
  }

  async searchUsers(search: string) {
    const query = {
      $or: [{ username: new RegExp(search, 'i') }, { fullname: new RegExp(search, 'i') }],
      role: { $ne: 'Admin' }
    }
    const projection = { password: 0, email: 0, updatedAt: 0, __v: 0 }

    return await this.aggregate(query, 3, projection)
  }

  // Admin
  async usersAdmin(page: string) {
    const perPage = 10
    const currPage = parseInt(page)

    const sort = { $sort: { createdAt: -1 } }
    const skip = { $skip: perPage * (currPage - 1) }
    const limit = { $limit: perPage }

    const match = { $match: { $expr: { $ne: ['$role', 'Admin'] } } }

    const facet = {
      $facet: {
        documents: [sort, skip, limit],
        count: [{ $count: 'totalDocuments' }]
      }
    }

    const result = await this.model.aggregate([match, facet])
    const users = result[0].documents
    const totalDocuments = result[0].count[0]?.totalDocuments || 0

    return {
      users,
      totalDocuments
    }
  }
}
