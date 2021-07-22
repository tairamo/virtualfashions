import { injectable } from 'inversify'

import { generateJwtToken, verifyJwtToken } from '../utils/jwt'
import { registrationContinue, forgotPasswordMail } from '../utils/mail'

@injectable()
export default class Auth {
  verifyToken(token: string) {
    return verifyJwtToken(token)
  }

  generateToken(data: any): string {
    return generateJwtToken(data)
  }

  async verifyEmail(email: string) {
    const token = generateJwtToken({ email })

    // Send email verification template
    registrationContinue(email, token)

    return { message: `Verification link sent to ${email}. Please use verification link to sign up.` }
  }

  async forgotPassword(email: string, token: string) {
    // Send forgot password mail to user
    forgotPasswordMail(email, token)
  }
}
