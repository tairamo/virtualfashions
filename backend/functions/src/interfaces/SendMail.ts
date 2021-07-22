import * as request from 'request'

export interface SendMail {
  to: string
  cc?: string
  bcc?: string
  from?: string
  subject?: string
  html?: string
  text?: string
  template?: string
  mg_variables?: string
  inline?: request.Request[]
}
