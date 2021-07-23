import config from '../config'
import { SendMail } from '../interfaces/SendMail'

const mailgun = require('mailgun-js')({
  apiKey: config.mailgun.api_key,
  domain: config.mailgun.domain
})

export const sendMail = (data: SendMail, cb: Function) => {
  const mailConfig: SendMail = {
    from: data.from || config.mailgun.from,
    to: data.to,
    subject: data.subject,
    html: data.html,
    inline: data.inline
  }

  if (data.cc) mailConfig.cc = data.cc
  if (data.bcc) mailConfig.bcc = data.bcc
  if (data.bcc) mailConfig.text = data.text

  return mailgun.messages().send(mailConfig, function (error: any, body: any) {
    if (error) {
      cb(error)
    } else {
      cb(body)
    }
  })
}
