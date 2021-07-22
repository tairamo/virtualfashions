export class PasswordError extends Error {
  public code = 400
  constructor(message = 'Email or Password not matched!') {
    super(message)
  }
}
