import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { Video } from "../widget/video";
import { Image } from "../widget/image";
import { useAuth } from "../../utils/auth";
import { UserWidget } from "../widget/user";
import { Button } from "../ui/Button/Button";
import { Spinner } from "../ui/Spinner/Spinner";
import { TokenBid } from "../widget/bids/token-bid";
import { INTERVAL, AUCTION_ENDED } from "../../constants";
import { bidDuration, getProfileUrl } from "../../utils/general";

export const Token = ({ auction }) => {
  const { token } = auction;
  const interval = useRef();
  const { user } = useAuth();
  const router = useRouter();
  const biddingEndDate = moment(auction?.biddingEndDate);

  // Bidding
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [displayTime, setDisplayTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const setBidDuration = (duration) => {
    if (!duration) return;

    if (duration.asSeconds() <= 0) {
      // Clear interval
      clearInterval(interval.current);

      // Set display time state
      return setDisplayTime(AUCTION_ENDED);
    }

    // Set display time state
    setDisplayTime({
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    });
  };

  useEffect(() => {
    // Cleanup function
    const load = () => {
      const duration = bidDuration(biddingEndDate);
      setBidDuration(duration);
    };

    load();
    interval.current = setInterval(() => load(), INTERVAL);

    return () => clearInterval(interval.current);
  }, []);

  let file = (
    <Image
      alt={token?.title}
      url={token?.thumbnailUrl}
      className="max-w-full md:max-h-60vh md:m-auto cursor-default"
    />
  );

  if (token?.thumbnailContentType?.includes("video")) {
    file = (
      <div className="md:h-25 flex justify-center w-full m-auto">
        <div className="flex relative">
          <Video
            url={token?.thumbnailUrl}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`max-w-full max-h-60vh m-auto sm:filter mx-auto cursor-default ${
              !isVideoLoaded && "filter blur drop-shadow-02020"
            }`}
          />

          {!isVideoLoaded && (
            <div className="opacity-100">
              <div className="absolute transform -translate-y-1/2 -translate-x-1/2 left-2/4 top-2/4">
                <Spinner color="text-black" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="md:grid-cols-2sm md:pt-16 md:gap-8 md:items-center dl:gap-12 dl:pt-24 lg:gap-24 grid gap-0 min-h-calc86px pt-6">
      <Link href={`/${token?.ownedBy?.username}/${token?._id}`}>
        <div className="md:max-w-40 md:ml-auto w-full">{file}</div>
      </Link>

      <div className="dl:pb-6">
        <div className="md:pt-0 flex pt-6 cursor-pointer w-max">
          <UserWidget
            user={token?.ownedBy}
            image={getProfileUrl(token?.ownedBy)}
          />
        </div>

        <div className="dl:gap-8 gap-6 grid">
          <div className="pt-4 w-max">
            <Link href={`/${token?.ownedBy?.username}/${token?._id}`}>
              <h2 className="md:text-3.5 dl:text-4.125 tracking-tight cursor-pointer leading-1.15 font-semibold text-2.875">
                {token?.title}
              </h2>
            </Link>
          </div>

          {/* For reserve price */}
          {/* <div className="text-left">
            <div className="mb-1.5 font-base font-semibold">Reserve Price</div>
            <div className="lg:text-2 mb-2.5 text-2xl font-semibold">
              {token?.minBidPrice} ETH
            </div>
            <div className="text-lg font-semibold text-gray-500">
              ${token?.minBidPrice} * doller price
            </div>
          </div> */}
          {/* For reserve price */}

          {/* Live auction */}
          <TokenBid
            displayTime={displayTime}
            bidPrice={
              auction.bids.length > 0 ? auction.bids[0].bidETH.toFixed(2) : 0
            }
          />
          {/* Live auction */}

          <div className="sm:grid-cols-1fr-1fr md:gap-4 md:grid-cols-3fr-2fr max-w-31.25 gap-2.5 grid grid">
            {user?._id !== token?.ownedBy?._id && (
              <Button
                text="Place a bid"
                onClick={() =>
                  router.push(`/${token?.ownedBy?.username}/${token?._id}/bid`)
                }
                className="sm:px-6 md:px-8 md:py-4 rounded-md appearance-none inline-block text-center font-semibold px-2 py-4 transition-all duration-300 ease-trans-expo text-white border-2 border-black min-h-3.75 h-3.75 w-full bg-black hover:shadow-btn transform-2px leading-1.2 focus:outline-none"
              />
            )}
            <Button
              text="View token"
              onClick={() =>
                router.push(`/${token?.ownedBy?.username}/${token?._id}`)
              }
              className="sm:px-6 md:px-8 md:py-4 rounded-md appearance-none inline-block text-center font-semibold px-2 py-4 transition-all duration-300 ease-trans-expo text-black border-2 border-black min-h-3.75 w-full bg-transparent hover:shadow-btn transform-2px hover:bg-black hover:text-white leading-1.2 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
