export class PasswordNotMatch extends Error {
  public code = 400
  constructor(message = 'Password must match!') {
    super(message)
  }
}
