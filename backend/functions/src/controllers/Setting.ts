import { Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { ETH } from '../services/ETH'
import { TYPES } from '../services/Container/types'

@injectable()
export class SettingController {
  public ethService: ETH

  constructor(@inject(TYPES.ServiceETH) ethService: ETH) {
    this.ethService = ethService
  }

  async fetchEtherPrice(request: Request, response: Response) {
    const ethPrice = await this.ethService.etherPrice()
    return response.json({ price: ethPrice })
  }
}
