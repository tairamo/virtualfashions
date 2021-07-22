export class ResetTokenUsed extends Error {
  public code = 400
  constructor(message = 'Reset token already used!') {
    super(message)
  }
}
