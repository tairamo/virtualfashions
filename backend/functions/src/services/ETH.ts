import axios from 'axios'
import { inject, injectable } from 'inversify'
import { SettingModel } from '../models/Setting'
import { TYPES } from './Container/types'
import { DBModel } from './DBModel'
import * as moment from 'moment'

@injectable()
export class ETH extends DBModel {
  private config: any

  constructor(@inject(TYPES.Config) config: any) {
    super(SettingModel)
    this.config = config
  }

  async fetchEtherPrice() {
    const endpoint = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`
    const { data } = await axios.get(endpoint, { headers: { 'X-CMC_PRO_API_KEY': this.config.coin.key } })
    return data['data'][1]['quote']['USD']['price']
  }

  async etherPrice() {
    const date = moment().subtract(1, 'hour').toDate()
    let doc = await this.model.findOne({ name: 'ethPrice', updatedAt: { $gte: date } })
    let ethPrice = doc?.value
    if (!doc) {
      const price = await this.fetchEtherPrice()
      await this.model.findOneAndUpdate({ name: 'ethPrice' }, { value: price, updatedAt: new Date() }, { upsert: true })
      ethPrice = price
    }
    return ethPrice
  }
}
