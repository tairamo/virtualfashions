import { Errors } from 'validatorjs'

export class ValidationError extends Error {
  public payload: Errors
  public code = 400
  constructor(payload: Errors, message = 'Bad request') {
    super(message)
    this.payload = payload
  }
}
