export class NotFoundError extends Error {
  public payload: object
  public code = 400
  constructor(payload: object, message = 'Not found') {
    super(message)
    this.payload = payload
  }
}
