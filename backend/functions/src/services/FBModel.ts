import { injectable } from 'inversify'

import { Query } from '../interfaces/Query'

@injectable()
export class FBModel {
  private firestore: any
  private collectionName = 'users'

  constructor(firestore: any, collectionName: any) {
    this.firestore = firestore
    this.collectionName = collectionName
  }

  collection() {
    return this.firestore.collection(this.collectionName)
  }

  async getBy({ filters, sort }: Query) {
    let query = this.collection()

    // filters
    if (filters) {
      for (const filter of filters) {
        const [field, operator, value] = filter
        query = query.where(field, operator, value)
      }
    }

    // sort
    if (sort && Object.keys(sort)[0]) {
      query = query.orderBy(`${Object.keys(sort)[0]}`, `${Object.values(sort)[0]}`)
    }

    return await query.get()
  }

  async getFirst({ filters, sort }: Query) {
    const item = null
    const querySnapshot = await this.getBy({ filters, sort })
    if (!(querySnapshot?.docs?.length > 0)) return item
    return querySnapshot.docs[0].data()
  }

  async update(uid: string, data: any, options?: any) {
    return await this.collection().doc(uid).set(data, options)
  }

  async insert(id: string, data: any) {
    return await this.collection().doc(id).set(data)
  }
}
