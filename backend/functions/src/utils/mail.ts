import * as path from 'path'
import * as ejs from 'ejs'
import * as request from 'request'

import { sendMail } from './mail-transport'
import { SendMail } from '../interfaces/SendMail'
import { TWITTER_LOGO, APP_LOGO, APP_DOMAIN } from '../constants'
import { Support } from '../interfaces/Support'
import config from '../config'

// Auction won
export const auctionWonEmail = async (toMail: string, title: string, bid_price: string) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Auction Won template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/auction-won.ejs'), {
    title,
    bid_price,
    claim_link: `${APP_DOMAIN}/bids`
  })

  const config: SendMail = {
    to: toMail,
    subject: 'Auction won',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return new Promise<void>((resolve, reject) => {
    // Send mail to auction winner user
    sendMail(config, (data: any) => {
      resolve(data)
    })
  })
}

// Auction ended
export const auctionEnded = async (toMail: string, title: string, username: string, link: string) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Auction ended template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/auction-ended.ejs'), {
    title,
    username,
    transfer_token_link: link
  })

  const config: SendMail = {
    to: toMail,
    subject: 'Auction ended',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return new Promise<void>((resolve, reject) => {
    // Send mail to auction winner user
    sendMail(config, (data: any) => {
      resolve(data)
    })
  })
}

// Token verification
export const tokenVerification = async (toMail: string, title: string) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Token verification template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/token-verification.ejs'), {
    title
  })

  const config: SendMail = {
    to: toMail,
    subject: 'Token verification',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return sendMail(config, (data: any) => {
    console.log(data)
  })
}

// Token verified
export const tokenVerified = async (toMail: string, title: string, link: string) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Token verified template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/token-verified.ejs'), {
    title,
    profile_link: link
  })

  const config: SendMail = {
    to: toMail,
    subject: 'Token verified',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return sendMail(config, (data: any) => {
    console.log(data)
  })
}

// Registration completed
export const registrationCompleted = async (toMail: string) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Registration completed template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/registration-completed.ejs'), {
    login_link: `${APP_DOMAIN}/login`
  })

  const config: SendMail = {
    to: toMail,
    subject: 'Registration completed',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return sendMail(config, (data: any) => {
    console.log(data)
  })
}

// Registration continue
export const registrationContinue = async (toMail: string, token: string) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Registration continue template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/registration-continue.ejs'), {
    continue_link: `${APP_DOMAIN}/register?token=${token}`
  })

  const config: SendMail = {
    to: toMail,
    subject: 'Registration',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return sendMail(config, (data: any) => {
    console.log(data)
  })
}

// Forgot password
export const forgotPasswordMail = async (toMail: string, token: string) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Registration continue template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/reset-password.ejs'), {
    reset_link: `${APP_DOMAIN}/reset-password?token=${token}`
  })

  const config: SendMail = {
    to: toMail,
    subject: 'Reset password',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return sendMail(config, (data: any) => {
    console.log(data)
  })
}

// Password changed
export const passwordChangedMail = async (toMail: string) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Registration continue template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/password-changed.ejs'), {
    login_link: `${APP_DOMAIN}/login`
  })

  const config: SendMail = {
    to: toMail,
    subject: 'Password changed',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return sendMail(config, (data: any) => {
    console.log(data)
  })
}

// Contact support
export const contactSupport = async (data: Support) => {
  const logoFile = request(APP_LOGO)
  const twitterFile = request(TWITTER_LOGO)

  // Registration continue template
  const emailTemplate = await ejs.renderFile(path.join(__dirname, '../templates/contact-support.ejs'), {
    email: data.email,
    fullname: data.fullname,
    phone: data.phone,
    message: data.message
  })

  const configuration: SendMail = {
    from: data.email,
    to: config.mailgun.from,
    subject: 'Support',
    html: emailTemplate,
    inline: [logoFile, twitterFile]
  }

  return sendMail(configuration, (data: any) => {
    console.log(data)
  }) 
}
