import { Router } from 'express'
import { TYPES } from '../services/Container/types'
import { UserController } from '../controllers/User'
import { container } from '../services/Container'
import { auth, catchError, validate } from '../middlewares'

const userController = container.get<UserController>(TYPES.ControllerUser)

const router = Router()

router.post('/', catchError(userController, 'fetchUsers'))

router.get('/creators', catchError(userController, 'fetchCreators'))

router.get('/:username', catchError(userController, 'fetchUser'))

router.put('/:id', [auth], catchError(userController, 'updateUser'))

router.post('/support', [validate('support')], catchError(userController, 'supportRequest'));

// Admin routes
router.get('/admin/fetch', catchError(userController, 'fetchUsersAdmin'))

export { router }
