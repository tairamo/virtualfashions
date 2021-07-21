import { ActivityList } from "../widget/activity/activityList";
import { AuctionWonWidget } from "../widget/activity/auctionWon";
import {
  AUCTION_WON,
  NIFTY_LISTED,
  NIFTY_MINTED,
  BID_SUBMITTED,
  AUCTION_SETTLED,
  DEFAULT_PROFILE_IMAGE_URL,
} from "../../constants";

export const Activity = ({ activity, auction }) => {
  const { user, data, bid } = activity;

  let profileImage = DEFAULT_PROFILE_IMAGE_URL;
  if (user?.profileUrl) {
    profileImage = user?.profileUrl;
  }

  let event = "";
  let bidPrice = "";
  let renderAcitvity = (
    <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
  );

  switch (activity.event) {
    case NIFTY_MINTED:
      event = "Minted by ";
      renderAcitvity = (
        <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
      );
      break;
    case NIFTY_LISTED:
      event = "Listed by ";
      bidPrice = auction?.minimumBid.toFixed(2) || "";
      renderAcitvity = (
        <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
      );
      break;
    case BID_SUBMITTED:
      event = "Bid placed by ";
      bidPrice = bid?.bidETH.toFixed(2) || "";
      renderAcitvity = (
        <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
      );
      break;
    case AUCTION_SETTLED:
      event = "Auction settled by ";
      renderAcitvity = (
        <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
      );
      break;
    case AUCTION_WON:
      event = "Auction won by ";
      bidPrice = bid?.bidETH.toFixed(2) || "";
      renderAcitvity = (
        <AuctionWonWidget
          event={event}
          bidPrice={bidPrice}
          activity={activity}
        />
      );
      break;
  }

  return renderAcitvity;
};
