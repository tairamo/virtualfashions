import { Router } from 'express'

import { container } from '../services/Container'
import { auth, catchError, validate } from '../middlewares'
import { TYPES } from '../services/Container/types'
import { BidController } from '../controllers/Bid'

const bidController = container.get<BidController>(TYPES.ControllerBid)

const router = Router()

router.post('/', [auth, validate('bid')], catchError(bidController, 'createBid'))

router.get('/', [auth], catchError(bidController, 'fetchBids'))

export { router }
