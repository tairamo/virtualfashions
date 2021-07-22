export class UserNotFound extends Error {
  public payload: string
  public code = 400
  constructor(payload: string, message = 'User not found') {
    super(message)
    this.payload = payload
  }
}
