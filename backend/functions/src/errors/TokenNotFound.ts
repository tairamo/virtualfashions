export class TokenNotFound extends Error {
  public payload: string
  public code = 400
  constructor(payload: string, message = 'Token not found') {
    super(message)
    this.payload = payload
  }
}
