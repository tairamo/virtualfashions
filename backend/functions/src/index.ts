import 'reflect-metadata'

import * as express from 'express'
import * as mongoose from 'mongoose'
import * as functions from 'firebase-functions'
import * as cookieParser from 'cookie-parser'

import config from './config'

import { router as userRouter } from './routers/user'
import { router as authRouter } from './routers/auth'
import { router as tokenRouter } from './routers/token'
import { router as auctionRouter } from './routers/auction'
import { router as bidRouter } from './routers/bid'
import { router as auctionResultRouter } from './routers/auctionResult'
import { router as settingRouter } from './routers/setting'
import { router as leadRouter } from './routers/lead'

// cron
import { declareAuctionWinner } from './cron'

const app = express()

const cors = require('cors')((req: express.Request, callback: any) => {
  let options: any = { credentials: true, origin: false }
  if (config.origins.indexOf(req.header('Origin')) !== -1) {
    options = { ...options, origin: true }
  }
  callback(null, options)
})

app.use(cors)

app.use(cookieParser())

app.use('/auth', authRouter)

app.use('/users', userRouter)

app.use('/tokens', tokenRouter)

app.use('/auctions', auctionRouter)

app.use('/bids', bidRouter)

app.use('/auction-results', auctionResultRouter)

app.use('/settings', settingRouter)

app.use('/leads', leadRouter)

app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
  console.error(error)
  response.status(error.code).send(error.message)
})

mongoose.connect(config.db.mongouri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log('db connected')
})

exports.api = functions.region('us-central1').https.onRequest(app)
exports.cronDeclareAuctionWinner = functions.region('us-central1').pubsub.schedule('every 1 minutes').onRun(declareAuctionWinner)
