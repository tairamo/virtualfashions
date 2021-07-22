export const ADMIN = 'admin'

// models
export const USER = 'User'
export const TOKEN = 'Token'
export const AUCTION = 'Auction'
export const BID = 'Bid'
export const ACTIVITY = 'Activity'
export const AUCTION_RESULT = 'AuctionResult'
export const Setting = 'Setting'
export const LEAD = 'Lead'

// auction type
export const TYPE_AUCTION = 'Auction'
export const TYPE_MARKET_PLACE = 'Marketplace'

// auction status
export const AUCTION_OPEN = 'Open'
export const AUCTION_SETTLED = 'Settled'
export const AUCTION_CLOSE = 'Close'
export const AUCTION_RESULT_UNSOLD = 'Unsold'
export const AUCTION_RESULT_WON = 'Won'

// token types
export const TOKEN_PENDING_REVIEW = 'Pending Review'
export const TOKEN_APPROVED = 'Approved'

// model enum
export const AUCTION_TYPE_ENUM = [TYPE_AUCTION, TYPE_MARKET_PLACE]
export const AUCTION_STATUS_ENUM = [AUCTION_OPEN, AUCTION_CLOSE]
export const AUCTION_RESULT_STATUS_ENUM = [AUCTION_RESULT_WON, AUCTION_RESULT_UNSOLD]
export const TOKEN_STATUS_ENUM = [TOKEN_PENDING_REVIEW, TOKEN_APPROVED]

// event types
export const EventTypes = {
  TOKEN_MINTED: 'TOKEN_MINTED',
  TOKEN_LISTED: 'TOKEN_LISTED',
  BID_SUBMITTED: 'BID_SUBMITTED',
  AUCTION_WON: 'AUCTION_WON',
  AUCTION_SETTLED: 'AUCTION_SETTLED',
  TOKEN_TRANSFER: 'TOKEN_TRANSFER'
}

// errors
export const ERROR_CODES = {
  EMAIL_EXIST: 'EMAIL_EXIST'
}

export const ERRORS = {
  AUCTION_ALREADY_RUNNING: 'Auction is already running'
}

export const USER_PROJECTION = {
  'user.bannerUrl': 0,
  'user.email': 0,
  'user.isCreator': 0,
  'user.password': 0,
  'user.socials': 0,
  'user.resetToken': 0,
  'user.resetTokenUsed': 0
}

export const OWNEDBY_PROJECTION = {
  'ownedBy.bannerUrl': 0,
  'ownedBy.email': 0,
  'ownedBy.isCreator': 0,
  'ownedBy.password': 0,
  'ownedBy.socials': 0,
  'ownedBy.resetToken': 0,
  'ownedBy.resetTokenUsed': 0
}

export const CREATEDBY_PROJECTION = {
  'createdBy.bannerUrl': 0,
  'createdBy.isCreator': 0,
  'createdBy.password': 0,
  'createdBy.socials': 0,
  'createdBy.resetToken': 0,
  'createdBy.resetTokenUsed': 0
}

export const TOKEN_PROJECTION = {
  'token.user.bannerUrl': 0,
  'token.user.email': 0,
  'token.user.isCreator': 0,
  'token.user.password': 0,
  'token.user.socials': 0,
  'token.user.resetToken': 0,
  'token.user.resetTokenUsed': 0
}

export const USER_LOOKUP = { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' }
export const OWNEDBY_LOOKUP = { from: 'users', localField: 'ownedBy', foreignField: '_id', as: 'ownedBy' }

export const APP_DOMAIN = 'https://virtualfashion.io/'

export const APP_LOGO = 'https://virtualfashion.io/logo.png'
export const TWITTER_LOGO = 'https://puamnn.stripocdn.email/content/assets/img/social-icons/logo-colored/twitter-logo-colored.png'

export const TOKENS_MATCH = { $eq: ['$$id', '$tokenId'] }

export const TOKEN_CREATED_SORT = { $sort: { createdAt: -1, 'auction.biddingEndDate': -1 } }
export const TOKEN_COLLECTED_SORT = { $sort: { 'auction.biddingEndDate': -1, 'auction.createdAt': -1 } }
