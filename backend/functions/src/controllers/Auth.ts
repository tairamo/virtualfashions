import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import Auth from '../services/Auth'
import User from '../services/User'
import { TYPES } from '../services/Container/types'
import { UserNotFound } from '../errors/UserNotFound'
import { PasswordNotMatch } from '../errors/PasswordNotMatch'
import { ResetTokenUsed } from '../errors/ResetTokenUsed'
import { encryptPassword } from '../utils/encryption'
import { passwordChangedMail } from '../utils/mail'

@injectable()
export class AuthController {
  public authService: Auth
  public userService: User

  constructor(@inject(TYPES.ServiceAuth) authService: Auth, @inject(TYPES.ServiceUser) userService: User) {
    this.authService = authService
    this.userService = userService
  }

  async me(request: Request, response: Response) {
    const { authUser } = request
    const user = await this.userService.findOne({ _id: authUser._id })

    delete user.password
    return response.json(user)
  }

  async register(request: Request, response: Response) {
    const user = await this.userService.register(request.body)

    return response.json(user)
  }

  async login(request: Request, response: Response) {
    const user = await this.userService.login(request.body)

    return response.json(user)
  }

  async verifyEmail(request: Request, response: Response) {
    const { email } = request.body
    const result = await this.authService.verifyEmail(email)

    return response.json(result)
  }

  async forgotPassword(request: Request, response: Response) {
    const { email } = request.body

    // Find user
    const user = await this.userService.findOne({ email })
    if (!user) {
      throw new UserNotFound(email)
    }

    const token = this.authService.generateToken({ email })

    // Update token into user's document
    await this.userService.findOneAndUpdate({ email }, { resetToken: token, resetTokenUsed: false })

    this.authService.forgotPassword(email, token)

    return response.json({ message: `Reset password link sent to ${email}.` })
  }

  async resetPassword(request: Request, response: Response) {
    const { body } = request
    const { resetToken, newPassword, confirmPassword } = body

    if (newPassword !== confirmPassword) throw new PasswordNotMatch()

    const user = await this.userService.findOne({ resetToken })
    if (!user) throw new UserNotFound(resetToken)

    if (user.resetTokenUsed) throw new ResetTokenUsed()

    // Encrypt password
    const hashPassword = await encryptPassword(newPassword)

    await this.userService.findOneAndUpdate({ resetToken }, { password: hashPassword, resetTokenUsed: true })

    // Send mail
    passwordChangedMail(user.email)

    return response.json({ message: 'Password changed' })
  }
}
