import { Router } from 'express'

import { container } from '../services/Container'
import { catchError } from '../middlewares'
import { TYPES } from '../services/Container/types'
import { AuctionResultController } from '../controllers/AuctionResult'

const auctionResultController = container.get<AuctionResultController>(TYPES.ControllerAuctionResult)

const router = Router()

router.get('/:auctionId', catchError(auctionResultController, 'auctionResult'))

export { router }
