import { inject, injectable } from 'inversify'
import { Request, Response } from 'express'
import { Lead } from '../services/Lead'
import { TYPES } from '../services/Container/types'

@injectable()
export class LeadController {
  public leadService: Lead
  constructor(@inject(TYPES.ServiceLead) leadService: Lead) {
    this.leadService = leadService
  }

  async createLead(request: Request, response: Response) {
    const { body } = request
    const lead = await this.leadService.createLead(body)

    response.json(lead)
  }

  async fetchLeads(request: Request, response: Response) {
    const { query } = request
    const { page } = query as { page: string }
    const result = await this.leadService.fetchLeads(page)

    response.json(result)
  }
}
