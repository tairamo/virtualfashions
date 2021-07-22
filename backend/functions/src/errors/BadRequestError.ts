export class BadRequestError extends Error {
  public code = 400
  constructor(message = 'Bad request') {
    super(message)
  }
}
