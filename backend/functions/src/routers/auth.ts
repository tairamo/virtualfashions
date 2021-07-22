import { Router } from 'express'
import { TYPES } from '../services/Container/types'
import { AuthController } from '../controllers/Auth'
import { container } from '../services/Container'
import { auth, catchError, validate } from '../middlewares'

const authController = container.get<AuthController>(TYPES.ControllerAuth)

const router = Router()

router.post('/verify-email', [validate('verify-email')], catchError(authController, 'verifyEmail'))

router.post('/register', [validate('register')], catchError(authController, 'register'))

router.post('/login', [validate('login')], catchError(authController, 'login'))

router.post('/forgot-password', [validate('verify-email')], catchError(authController, 'forgotPassword'))

router.post('/reset-password', [validate('verify-password')], catchError(authController, 'resetPassword'))

router.get('/me', [auth], catchError(authController, 'me'))

export { router }
