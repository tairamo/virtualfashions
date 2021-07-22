import { Router } from 'express'
import { catchError, validate } from '../middlewares'
import { container } from '../services/Container'
import { TYPES } from '../services/Container/types'
import { LeadController } from '../controllers/Lead'

const router = Router()

const leadController = container.get<LeadController>(TYPES.ControllerLead)

router.post('/', [validate('lead')], catchError(leadController, 'createLead'))

// Admin
router.get('/admin', catchError(leadController, 'fetchLeads'))

export { router }
