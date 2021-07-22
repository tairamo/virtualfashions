import { injectable } from 'inversify'

import { DBModel } from './DBModel'
import { ActivityDoc } from '../interfaces/ActivityDoc'
import { ActivityModel } from '../models/Activity'
import { TokenDoc } from '../interfaces/TokenDoc'
import { UserDoc } from '../interfaces/UserDoc'

@injectable()
export default class Activity extends DBModel {
  constructor() {
    super(ActivityModel)
  }

  async createActivity(token: TokenDoc, event: string, by: UserDoc, eventData: any = null): Promise<ActivityDoc> {
    const data = { tokenId: token._id, event: event, by: by._id, data: eventData }
    return await this.create(data)
  }
}
