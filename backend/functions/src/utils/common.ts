import * as mongoose from 'mongoose'

export const docData = (snapshot: any) => {
  const docs: any[] = []

  snapshot.forEach((doc: any) => {
    docs.push(doc.data())
  })

  return docs
}

export const objectId = (id: string) => {
  return mongoose.Types.ObjectId(id)
}

export const numeric = (digit: any) => {
  return digit * 1
}

export const userLookup = (localField: string, as: string) => {
  return { from: 'users', localField, foreignField: '_id', as }
}

export const listLimit = (limit: number, page: number) => {
  const perPage = limit

  return { $limit: perPage * page }
}
