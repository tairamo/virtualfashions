import { injectable } from 'inversify'

@injectable()
export class DBModel {
  protected model: any

  constructor(model: any) {
    this.model = model
  }

  async create(data: any) {
    const doc = this.model(data)
    return await doc.save()
  }

  async findOne(query: any, projection?: any) {
    return this.model.findOne(query, projection).lean()
  }

  async find(query: any, sort?: any, condition?: any, projection?: any) {
    let find = this.model.find(query, projection)

    if (condition && Object.keys(condition)[0]) {
      find = find.where(`${Object.keys(condition)[0]}`).gt(`${Object.values(condition)[0]}`)
    }

    if (sort && Object.keys(sort)[0]) {
      find = find.sort(sort)
    }

    return find
  }

  async findOneAndUpdate(query: any, update: any, options?: any) {
    return this.model.findOneAndUpdate(query, update, options)
  }

  async aggregate(query: any, limit?: any, projection?: any, lookup?: any, sort?: any) {
    let find = this.model.aggregate().match(query)

    if (lookup) {
      find = find.lookup(lookup).unwind(lookup.as)
    }

    if (limit) {
      find = find.limit(limit)
    }

    if (projection) {
      find = find.project(projection)
    }

    if (sort) {
      find = find.sort(sort)
    }

    return find
  }

  getModel() {
    return this.model
  }
}
