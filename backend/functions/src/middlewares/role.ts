import { Request, Response } from 'express'

export const role = (role: string) => {
  return (request: Request, response: Response, next: any) => {
    const user = request.authUser
    if (!user || !user.role || user.role !== role) {
      return response.status(401).send('Unauthenticated')
    }
    return next()
  }
}
