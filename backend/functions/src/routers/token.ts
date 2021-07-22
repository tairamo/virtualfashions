import { Router } from 'express'

import { container } from '../services/Container'
import { auth, catchError, validate } from '../middlewares'
import { TYPES } from '../services/Container/types'
import { TokenController } from '../controllers/Token'

const tokenController = container.get<TokenController>(TYPES.ControllerToken)

const router = Router()

router.post('/', [auth, validate('token')], catchError(tokenController, 'createToken'))

router.put('/:id', [auth], catchError(tokenController, 'updateToken'))

router.get('/created', catchError(tokenController, 'fetchCreatedTokens'))

router.get('/collected', catchError(tokenController, 'fetchCollectedTokens'))

router.get('/fetch/:username/:id', catchError(tokenController, 'fetchToken'))

router.get('/:id/metadata', catchError(tokenController, 'fetchMetadata'))

router.get('/', catchError(tokenController, 'search'))

// Admin routes
router.get('/admin/fetch', catchError(tokenController, 'fetchTokensAdmin'))

router.put('/admin/:id', [auth], catchError(tokenController, 'updateTokenAdmin'))

router.get('/admin/fetch/:username/:id', catchError(tokenController, 'fetchTokenAdmin'))

router.get('/admin/verified/:id', [auth], catchError(tokenController, 'tokenVerified'))

export { router }
