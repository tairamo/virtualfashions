import { Container } from 'inversify'

import Auth from '../Auth'
import User from '../User'
import Token from '../Token'
import Activity from '../Activity'
import { TYPES } from './types'
import Auction from '../Auction'
import Bid from '../Bid'
import AuctionResult from '../AuctionResult'
import { ETH } from '../ETH'
import { Lead } from '../Lead'

export default (container: Container) => {
  container.bind<User>(TYPES.ServiceUser).to(User)
  container.bind<Auth>(TYPES.ServiceAuth).to(Auth)
  container.bind<Token>(TYPES.ServiceToken).to(Token)
  container.bind<Auction>(TYPES.ServiceAuction).to(Auction)
  container.bind<Bid>(TYPES.ServiceBid).to(Bid)
  container.bind<Activity>(TYPES.ServiceActivity).to(Activity)
  container.bind<AuctionResult>(TYPES.ServiceAuctionResult).to(AuctionResult)
  container.bind(TYPES.ServiceETH).to(ETH)
  container.bind<Lead>(TYPES.ServiceLead).to(Lead)
  return container
}
