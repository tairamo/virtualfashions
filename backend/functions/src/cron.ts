import Auction from './services/Auction'
import { container } from './services/Container'
import { TYPES } from './services/Container/types'

const auctionModel = container.get<Auction>(TYPES.ServiceAuction)

export const declareAuctionWinner = () => {
  const randomId = parseInt(`${Math.random() * 1000000}`, 10)
  const functionName = declareAuctionWinner.name
  console.log(`START: ${functionName} ${randomId} ${new Date()}`)
  auctionModel
    .updateAuctionWinner()
    .then()
    .catch(error => console.error(error))
    .finally(() => {
      console.log(`END: ${functionName} ${randomId} ${new Date()}`)
    })
  return true
}
