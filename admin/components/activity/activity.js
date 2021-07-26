import { DEFAULT_PROFILE_IMAGE_URL } from "../../constants";
import { ActivityList } from "../widgets/activity/activityList";
import { AuctionWonWidget } from "../widgets/activity/auctionWon";

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
    case "TOKEN_MINTED":
      event = "Minted by ";
      renderAcitvity = (
        <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
      );
      break;
    case "TOKEN_LISTED":
      event = "Listed by ";
      bidPrice = auction?.minimumBid.toFixed(2) || "";
      renderAcitvity = (
        <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
      );
      break;
    case "BID_SUBMITTED":
      event = "Bid placed by ";
      bidPrice = bid?.bidETH.toFixed(2) || "";
      renderAcitvity = (
        <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
      );
      break;
    case "AUCTION_SETTLED":
      event = "Auction settled by ";
      renderAcitvity = (
        <ActivityList event={event} bidPrice={bidPrice} activity={activity} />
      );
      break;
    case "AUCTION_WON":
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
