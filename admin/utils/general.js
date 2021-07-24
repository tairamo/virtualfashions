import moment from "moment";
import nookies from "nookies";

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
  return nookies.get({ path: "/" })?.["admin-token"] || "";
};

// Bid duration Counter
export const bidDuration = (bidEndDate) => {
  if (!bidEndDate) return null;

  const currentTime = moment();
  return moment.duration(bidEndDate.clone().diff(currentTime));
};

// Duration counter time
export const counterTime = (type, duration, symbol) => {
  if (duration[type]() > 0 || type === "seconds") {
    return `${duration[type]()}${symbol}`;
  }

  return "";
};

// Auction won delay
export const auctionWonDelay = (date) => {
  return new Date(date).getTime() + 180000 < new Date().getTime();
};
