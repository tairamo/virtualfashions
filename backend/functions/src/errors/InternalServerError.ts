export class InternalServerError extends Error {
  public payload: string
  public code = 500
  constructor(payload: string, message = 'Email already exists') {
    super(message)
    this.payload = payload
  }
}
