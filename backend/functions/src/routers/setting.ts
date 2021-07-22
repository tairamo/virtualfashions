import { Router } from 'express'

import { container } from '../services/Container'
import { catchError } from '../middlewares'
import { TYPES } from '../services/Container/types'
import { SettingController } from '../controllers/Setting'

const settingController = container.get<SettingController>(TYPES.ControllerSetting)

const router = Router()

router.get('/ethPrice', catchError(settingController, 'fetchEtherPrice'))

export { router }
