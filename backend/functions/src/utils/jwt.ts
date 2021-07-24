import * as jwt from 'jsonwebtoken'

import config from '../config'

export const verifyJwtToken = (token: string) => {
  return jwt.verify(token, config.jwtsecret)
}

export const generateJwtToken = (data: any) => {
  return jwt.sign(data, config.jwtsecret, { expiresIn: '1d' })
}

export const decodeJwtToken = (token: string) => {
  return jwt.decode(token, config.jwtsecret)
}
