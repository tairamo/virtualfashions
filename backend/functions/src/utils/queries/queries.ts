import { userLookup } from '../common'
import { CREATEDBY_PROJECTION, OWNEDBY_PROJECTION, USER_PROJECTION } from '../../constants'

export const tokensWithActiveAuctions = (query: any) => {
  const stages = [
    {
      $lookup: {
        from: 'auctions',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: query
            }
          },
          {
            $group: {
              _id: '$tokenId',
              lastest: { $last: '$$ROOT' }
            }
          },
          {
            $replaceRoot: {
              newRoot: '$lastest'
            }
          },
          {
            $lookup: userLookup('createdBy', 'createdBy')
          },
          {
            $project: { ...CREATEDBY_PROJECTION }
          },
          {
            $unwind: {
              path: '$createdBy',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'bids',
              let: { auctionId: '$_id' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$auctionId', '$auctionId'] } } },
                { $sort: { bidETH: -1 } },
                {
                  $lookup: userLookup('createdBy', 'createdBy')
                },
                {
                  $project: { ...CREATEDBY_PROJECTION }
                },
                {
                  $unwind: {
                    path: '$createdBy',
                    preserveNullAndEmptyArrays: true
                  }
                }
              ],
              as: 'bids'
            }
          }
        ],
        as: 'auction'
      }
    },
    {
      $unwind: {
        path: '$auction',
        preserveNullAndEmptyArrays: true
      }
    },
    { $lookup: userLookup('userId', 'user') },
    { $project: { ...USER_PROJECTION } },
    { $unwind: { path: '$user' } },
    { $lookup: userLookup('ownedBy', 'ownedBy') },
    { $project: { ...OWNEDBY_PROJECTION } },
    { $unwind: { path: '$ownedBy' } },
    {
      $lookup: {
        from: 'activities',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [{ $eq: ['$$id', '$tokenId'] }]
              }
            }
          },
          { $sort: { createdAt: -1 } },
          { $lookup: { from: 'bids', localField: 'data.bidId', foreignField: '_id', as: 'bid' } },
          { $unwind: { path: '$bid', preserveNullAndEmptyArrays: true } },
          { $lookup: userLookup('by', 'user') },
          {
            $project: { ...USER_PROJECTION }
          },
          { $unwind: { path: '$user' } }
        ],
        as: 'activities'
      }
    }
  ]

  return stages
}

export const tokenActivities = () => {
  const stages = [
    {
      $lookup: {
        from: 'users',
        localField: 'by',
        foreignField: '_id',
        as: 'by'
      }
    },
    {
      $unwind: {
        path: '$by',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'auctions',
        localField: 'data.auctionId',
        foreignField: '_id',
        as: 'data.auctionId'
      }
    },
    {
      $lookup: {
        from: 'bids',
        localField: 'data.bidId',
        foreignField: '_id',
        as: 'data.bidId'
      }
    },
    {
      $unwind: {
        path: '$data.auctionId',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$data.bidId',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        tokenId: 1,
        event: 1,
        by: 1,
        'data.chainInfo': 1,
        'data.auction': '$data.auctionId',
        'data.bid': '$data.bidId',
        createdAt: 1
      }
    }
  ]

  return stages
}

export const tokensOwnerOpenAuction = (query: any) => {
  const stages = [
    {
      $lookup: {
        from: 'auctions',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: query
            }
          },
          {
            $group: {
              _id: '$tokenId',
              lastest: { $last: '$$ROOT' }
            }
          },
          {
            $replaceRoot: {
              newRoot: '$lastest'
            }
          },
          {
            $lookup: userLookup('createdBy', 'createdBy')
          },
          {
            $project: { ...CREATEDBY_PROJECTION }
          },
          {
            $unwind: {
              path: '$createdBy',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'bids',
              let: { auctionId: '$_id' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$auctionId', '$auctionId'] } } },
                { $sort: { bidETH: -1 } },
                {
                  $lookup: userLookup('createdBy', 'createdBy')
                },
                {
                  $project: { ...CREATEDBY_PROJECTION }
                },
                {
                  $unwind: {
                    path: '$createdBy',
                    preserveNullAndEmptyArrays: true
                  }
                }
              ],
              as: 'bids'
            }
          }
        ],
        as: 'openAuction'
      }
    },
    {
      $unwind: {
        path: '$openAuction',
        preserveNullAndEmptyArrays: true
      }
    }
  ]

  return stages
}

export const tokensWithoutActivities = (query: any) => {
  const stages = [
    {
      $lookup: {
        from: 'auctions',
        let: { id: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: query
            }
          },
          {
            $group: {
              _id: '$tokenId',
              lastest: { $last: '$$ROOT' }
            }
          },
          {
            $replaceRoot: {
              newRoot: '$lastest'
            }
          },
          {
            $lookup: userLookup('createdBy', 'createdBy')
          },
          {
            $project: { ...CREATEDBY_PROJECTION }
          },
          {
            $unwind: {
              path: '$createdBy',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'bids',
              let: { auctionId: '$_id' },
              pipeline: [
                { $match: { $expr: { $eq: ['$$auctionId', '$auctionId'] } } },
                { $sort: { bidETH: -1 } },
                {
                  $lookup: userLookup('createdBy', 'createdBy')
                },
                {
                  $project: { ...CREATEDBY_PROJECTION }
                },
                {
                  $unwind: {
                    path: '$createdBy',
                    preserveNullAndEmptyArrays: true
                  }
                }
              ],
              as: 'bids'
            }
          }
        ],
        as: 'auction'
      }
    },
    {
      $unwind: {
        path: '$auction',
        preserveNullAndEmptyArrays: true
      }
    },
    { $lookup: userLookup('ownedBy', 'ownedBy') },
    { $project: { ...OWNEDBY_PROJECTION } },
    { $unwind: { path: '$ownedBy' } }
  ]

  return stages
}
