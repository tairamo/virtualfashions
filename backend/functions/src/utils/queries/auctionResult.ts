import { CREATEDBY_PROJECTION, USER_PROJECTION } from '../../constants'
import { userLookup } from '../common'

export const auctionsResultWithBid = (query: any, localField: string) => {
  const stages = [
    {
      $lookup: {
        from: 'auctions',
        localField: 'auctionId',
        foreignField: '_id',
        as: 'auction'
      }
    },
    {
      $unwind: {
        path: '$auction',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'nifties',
        let: { tokenId: '$tokenId' },
        pipeline: [
          { $match: { $expr: query } },
          {
            $lookup: userLookup(localField, 'user')
          },
          {
            $project: { ...USER_PROJECTION }
          },
          {
            $unwind: {
              path: '$user',
              preserveNullAndEmptyArrays: true
            }
          }
        ],
        as: 'token'
      }
    },
    {
      $unwind: {
        path: '$token',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'bids',
        let: { bidId: '$bidId' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$bidId', '$_id'] } } },
          {
            $lookup: {
              from: 'users',
              localField: 'createdBy',
              foreignField: '_id',
              as: 'createdBy'
            }
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
        as: 'bid'
      }
    },
    {
      $unwind: {
        path: '$bid',
        preserveNullAndEmptyArrays: true
      }
    }
  ]

  return stages
}
