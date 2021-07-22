import { injectable } from 'inversify'
import { DBModel } from './DBModel'
import { LeadModel } from '../models/Lead'
import { LeadDoc } from '../interfaces/LeadDoc'

@injectable()
export class Lead extends DBModel {
  constructor() {
    super(LeadModel)
  }

  async createLead(data: { email: string }): Promise<LeadDoc> {
    return await this.create(data)
  }

  async fetchLeads(page: string) {
    const perPage = 10
    const currPage = parseInt(page)

    const limit = { $limit: perPage }
    const sort = { $sort: { createdAt: -1 } }
    const skip = { $skip: (currPage - 1) * perPage }

    const facet = {
      $facet: {
        documents: [sort, skip, limit],
        count: [{ $count: 'totalDocuments' }]
      }
    }

    const result = await this.model.aggregate([facet])
    const leads = result[0].documents
    const totalDocuments = result[0].count[0].totalDocuments

    return {
      leads,
      totalDocuments
    }
  }
}
