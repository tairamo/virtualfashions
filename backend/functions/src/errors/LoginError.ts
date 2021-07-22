export class LoginError extends Error {
  public code = 400
  constructor(message = 'Invalid email or password!') {
    super(message)
  }
}
