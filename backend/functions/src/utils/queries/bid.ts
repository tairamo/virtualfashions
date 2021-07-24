import { CREATEDBY_PROJECTION, USER_PROJECTION } from '../../constants'

export const bidsWithTokenAndAuction = () => {
  const stages = [
    { $sort: { bidETH: -1 } },
    {
      $group: {
        _id: '$auctionId',
        doc: { $first: '$$ROOT' }
      }
    },
    {
      $replaceRoot: {
        newRoot: '$doc'
      }
    },
    {
      $lookup: {
        from: 'auctions',
        let: { auctionId: '$auctionId' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$auctionId', '$_id'] } } },
          {
            $lookup: {
              from: 'users',
              localField: 'createdBy',
              foreignField: '_id',
              as: 'createdBy'
            }
          },
          { $project: { ...CREATEDBY_PROJECTION } },
          {
            $unwind: {
              path: '$createdBy',
              preserveNullAndEmptyArrays: true
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
    {
      $lookup: {
        from: 'tokens',
        let: { tokenId: '$auction.tokenId' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$tokenId', '$_id'] } } },
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'user'
            }
          },
          { $project: { ...USER_PROJECTION } },
          {
            $unwind: {
              path: '$user',
              preserveNullAndEmptyArrays: true
            }
          }
          // {
          //   $lookup: {
          //     from: 'users',
          //     localField: 'ownedBy',
          //     foreignField: '_id',
          //     as: 'ownedBy'
          //   }
          // },
          // { $project: { 'ownedBy.bannerUrl': 0, 'ownedBy.fullname': 0, 'ownedBy.email': 0, 'ownedBy.isCreator': 0, 'ownedBy.password': 0, 'ownedBy.socials': 0, 'ownedBy.bio': 0 } },
          // {
          //   $unwind: {
          //     path: '$ownedBy',
          //     preserveNullAndEmptyArrays: true
          //   }
          // }
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
        let: { auctionId: '$auctionId' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$auctionId', '$auctionId'] } } },
          { $sort: { bidETH: -1 } },
          {
            $lookup: {
              from: 'users',
              localField: 'createdBy',
              foreignField: '_id',
              as: 'createdBy'
            }
          },
          { $project: { ...CREATEDBY_PROJECTION } },
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
  ]

  return stages
}
