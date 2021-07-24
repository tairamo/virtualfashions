import { Request, Response } from 'express'
import Validator from '../utils/validator'
import { ValidationError } from '../errors/ValidationError'

export const validate = (ruleName: string) => {
  const rules = require(`../rules/${ruleName}`).default
  return async (request: Request, response: Response, next: any) => {
    try {
      const validation = new Validator(request.body, rules())
      if (validation.fails()) throw new ValidationError(validation.errors)
      return next()
    } catch (err) {
      return response.status(400).json(err.payload.all())
    }
  }
}
