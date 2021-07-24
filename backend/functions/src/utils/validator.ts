import * as Validator from 'validatorjs'
import * as moment from 'moment'
import { verifyJwtToken } from './jwt'

Validator.register(
  'valid_token',
  (token: string | number | boolean) => {
    let valid = false

    try {
      // Decode token
      const tokenData: any = verifyJwtToken(`${token}`)
      if (tokenData.exp < moment().unix()) throw new Error('token expired')
      valid = true
    } catch (err) {
      console.error(err)
    }

    return valid
  },
  'Token is invalid'
)

export default Validator
