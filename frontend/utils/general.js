import moment from "moment";
import nookies from "nookies";
import * as jwt from "jsonwebtoken";

import {
  BID_PERCENTAGE,
  DEFAULT_BANNER_IMAGE_URL,
  DEFAULT_PROFILE_IMAGE_URL,
} from "../constants";

export const errorMessage = (error) => {
  let message = "";
  switch (error.code) {
    case "auth/email-already-in-use":
      message = `Email address already in use.`;
      break;
    case "auth/invalid-email":
      message = `Email address is invalid.`;
      break;
    case "auth/operation-not-allowed":
      message = `Error during sign up.`;
      break;
    case "auth/weak-password":
      message = `Password is not strong enough. Add additional characters including special characters and numbers`;
      break;
    default:
      message = error.message;
      break;
  }

  return message;
};

// Convert ETH account address
export const convertAddress = (address) => {
  return (
    address.slice(0, 6) +
    "..." +
    address.slice(address.length - 4, address.length)
  );
};

export const getToken = () => {
  return nookies.get({ path: "/" })?.token || "";
};

// Bid duration Counter
export const bidDuration = (bidEndDate) => {
  if (!bidEndDate) return null;

  const currentTime = moment();
  return moment.duration(bidEndDate.clone().diff(currentTime));
};

// Duration counter time
export const counterTime = (type, duration, symbol) => {
  if (type === "hours" && (duration["days"]() > 0 || duration[type]() > 0)) {
    return `${duration[type]()}${symbol}`;
  }

  if (type === "minutes" && (duration["hours"]() > 0 || duration[type]() > 0)) {
    return `${duration[type]()}${symbol}`;
  }

  if (duration[type]() > 0 || type === "seconds") {
    return `${duration[type]()}${symbol}`;
  }

  return "";
};

// Auction won delay
export const auctionWonDelay = (date) => {
  return new Date(date).getTime() + 60000 < new Date().getTime();
};

export const tokenVerification = (token) => {
  return jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
};

export const jwtError = (error) => {
  let message = "";
  switch (error) {
    case "jwt malformed":
    case "invalid signature":
      message = `Please use valid token!`;
      break;
    case "jwt expired":
      message = `Token expired!`;
      break;
    default:
      message = "Error while verifing token";
      break;
  }

  return message;
};

export const getProfileUrl = (user) => {
  let profileImage = DEFAULT_PROFILE_IMAGE_URL;
  if (user?.profileUrl) profileImage = user.profileUrl;

  return profileImage;
};

export const getBannerUrl = (user) => {
  let bannerImage = DEFAULT_BANNER_IMAGE_URL;
  if (user?.bannerUrl) bannerImage = user.bannerUrl;

  return bannerImage;
};

export const calculateMinBid = (auction) => {
  let bidValue = auction?.minimumBid;
  if (auction?.bids?.length > 0) {
    bidValue = auction.bids[0].bidETH;
  }

  // Minimum bid
  let minBid = bidValue + 0.1;

  // 10% of price
  const percentageBidValue = bidValue + bidValue / BID_PERCENTAGE;

  if (minBid < percentageBidValue) {
    minBid = percentageBidValue;
  }

  return minBid.toFixed(2);
};
