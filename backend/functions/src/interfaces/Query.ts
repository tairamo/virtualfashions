export interface Query {
  query?: any
  sort?: any
  updateData?: any
  filters?: any
}

export interface matchQuery {
  $match: {
    $expr: {
      $and?: { $eq: [string, string] }[]
      $or?: { $eq: [string, string] }[]
    }
  }
}
