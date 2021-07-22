export class EmailExistsError extends Error {
  public payload: string
  public code = 400
  constructor(payload: string, message = 'Email already exists') {
    super(message)
    this.payload = payload
  }
}
