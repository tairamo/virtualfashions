export class NotAnAdmin extends Error {
  public code = 400
  constructor(message = 'Make sure you are admin!') {
    super(message)
  }
}
