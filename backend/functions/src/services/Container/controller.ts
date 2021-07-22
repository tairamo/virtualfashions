import { Container } from 'inversify'

import { TYPES } from './types'
import { AuthController } from '../../controllers/Auth'
import { UserController } from '../../controllers/User'
import { TokenController } from '../../controllers/Token'
import { AuctionController } from '../../controllers/Auction'
import { BidController } from '../../controllers/Bid'
import { AuctionResultController } from '../../controllers/AuctionResult'
import { SettingController } from '../../controllers/Setting'
import { LeadController } from '../../controllers/Lead'

export default (container: Container) => {
  container.bind(TYPES.ControllerUser).to(UserController)
  container.bind(TYPES.ControllerAuth).to(AuthController)
  container.bind(TYPES.ControllerToken).to(TokenController)
  container.bind(TYPES.ControllerAuction).to(AuctionController)
  container.bind(TYPES.ControllerBid).to(BidController)
  container.bind(TYPES.ControllerAuctionResult).to(AuctionResultController)
  container.bind(TYPES.ControllerSetting).to(SettingController)
  container.bind(TYPES.ControllerLead).to(LeadController)

  return container
}
