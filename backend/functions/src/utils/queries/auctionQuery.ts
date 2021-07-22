import { CREATEDBY_PROJECTION, OWNEDBY_PROJECTION, USER_PROJECTION } from '../../constants'
import { userLookup } from '../../utils/common'

export const auctionsWithTokensAndBids = () => {
  const stages = [
    {
      $lookup: {
        from: 'tokens',
        let: { tokenId: '$tokenId' },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ['$$tokenId', '$_id'] }] } } },
          {
            $lookup: userLookup('userId', 'user')
          },
          { $project: { ...USER_PROJECTION } },
          {
            $unwind: {
              path: '$user',
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: userLookup('ownedBy', 'ownedBy')
          },
          { $project: { ...OWNEDBY_PROJECTION } },
          {
            $unwind: {
              path: '$ownedBy',
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
    { $match: { $expr: { $and: [{ $eq: ['$token.status', 'Approved'] }] } } }
  ]

  return stages
}
