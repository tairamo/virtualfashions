export class EmailNotExits extends Error {
  public payload: string
  public code = 400
  constructor(payload: string, message = 'Email not found') {
    super(message)
    this.payload = payload
  }
}
