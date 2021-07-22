import { Request, Response } from 'express'

import Auth from '../services/Auth'
import { TYPES } from '../services/Container/types'
import { container } from '../services/Container'

const authService = container.get<Auth>(TYPES.ServiceAuth)

export const auth = async (request: Request, response: Response, next: any) => {
  try {
    const token = request.headers['authorization']?.split(' ')?.[1]
    if (!token) throw new Error('Unauthenticated')
    const user = authService.verifyToken(token)
    request.authUser = user
  } catch (err) {
    console.log(err.message)
    return response.status(401).send('Unauthenticated')
  }
  return next()
}
