import * as functions from 'firebase-functions'
import { existsSync } from 'fs'
import { dirname } from 'path'

let config = functions.config().env

if (process.env.NODE_ENV !== 'production') {
  const envPath = dirname(__dirname) + '/env.json'

  if (existsSync(envPath)) {
    const env = require(envPath)
    config = env
  }
}

export default config
