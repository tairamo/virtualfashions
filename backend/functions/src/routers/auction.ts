import { Router } from 'express'

import { container } from '../services/Container'
import { auth, catchError, validate } from '../middlewares'
import { TYPES } from '../services/Container/types'
import { AuctionController } from '../controllers/Auction'

const auctionController = container.get<AuctionController>(TYPES.ControllerAuction)

const router = Router()

router.post('/', [auth, validate('auction')], catchError(auctionController, 'createAuction'))

router.get('/fetch', catchError(auctionController, 'fetchAuctions'))

router.put('/:id', catchError(auctionController, 'updateAuction'))

// Delete this route
router.get('/', catchError(auctionController, 'updateAuctionWinner'))

router.put('/:id/claim', [auth], catchError(auctionController, 'auctionSettle'))

export { router }
