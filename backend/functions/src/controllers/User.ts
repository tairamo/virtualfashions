import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import User from '../services/User'
import { TYPES } from '../services/Container/types'
import { contactSupport } from '../utils/mail'
import { SPECIAL_CHARS_REGEX } from '../constants'

@injectable()
export class UserController {
  public userService: User

  constructor(@inject(TYPES.ServiceUser) userService: User) {
    this.userService = userService
  }

  async show(request: Request, response: Response) {
    return response.json('hi')
  }

  async updateUser(request: Request, response: Response) {
    const { authUser, body } = request
    const { updateData, options } = body
    const query = { _id: authUser._id }

    await this.userService.updateOne(query, updateData, options)
    return response.json({ message: 'User updated' })
  }

  async fetchCreators(request: Request, response: Response) {
    const { query } = request
    const { page } = query as { page: string }
    const result = await this.userService.creators(page)
    return response.json(result)
  }

  async fetchUsers(request: Request, response: Response) {
    const { body: data } = request

    const users = await this.userService.users(data)
    return response.json(users)
  }

  async fetchUser(request: Request, response: Response) {
    const { username } = request.params

    const user = await this.userService.user({ username })
    return response.json(user)
  }

  async checkUsername(request: Request, response: Response) {
    const { query, authUser } = request
    const { username } = query as { username: string }

    if (SPECIAL_CHARS_REGEX.test(username)) {
      return response.json({ isTaken: true })
    }

    const user = await this.userService.user({ username })

    if (!user) {
      return response.json({ isTaken: false })
    }

    if (user?._id?.toString() === authUser._id) {
      return response.json({ isTaken: false })
    } else {
      return response.json({ isTaken: true })
    }
  }

  // Admin
  async fetchUsersAdmin(request: Request, response: Response) {
    const { query } = request
    const { page } = query as { page: string }

    const users = await this.userService.usersAdmin(page)
    return response.json(users)
  }

  async supportRequest(request: Request, response: Response) {
    const { body } = request

    // Send mail
    contactSupport(body)

    return response.json({ message: 'Support request sent' })
  }
}
