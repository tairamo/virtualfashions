import { NextFunction, Request, Response } from 'express'

export const catchError = (controller: any, method: any) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      return await controller[method](request, response, next)
    } catch (error) {
      return next(error)
    }
  }
}
