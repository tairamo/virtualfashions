import moment from "moment";
import Link from "next/link";

import { useETH } from "../../../context/ETH";
import { DEFAULT_PROFILE_IMAGE_URL } from "../../../constants";

export const AuctionWonWidget = ({ event, bidPrice, activity }) => {
  const { user } = activity;
  const { ethPrice } = useETH();

  return (
    <div className="grid gap-0.5 relative justify-center">
      <div className="sm:py-6 grid justify-center text-center py-4 px-2.5 gap-0 relative z-20">
        <div className="mx-auto mb-2.5 cursor-pointer">
          <Link href={`/${user?.username}`}>
            <div
              className="min-w-2.25 min-h-2.25 max-w-2.25 max-h-2.25 bg-gray-200 bg-cover bg-center rounded-full"
              style={{
                backgroundImage: `url(${
                  user?.profileUrl || DEFAULT_PROFILE_IMAGE_URL
                })`,
              }}
            ></div>
          </Link>
        </div>
        <div className="grid gap-0.313">
          <div className="sm:text-lg sm:leading-5	leading-1.2 text-base font-semibold">
            {event}
            <div className="inline-block cursor-pointer text-gray-700 transition-all duration-300 ease-trans-expo hover:text-black">
              <Link href={`/${user?.username}`}>
                <div className="flex sm:text-base sm:leading-1.4 font-semibold relative -top-0.5 text-sm leading-none">
                  @{user?.username || ""}
                </div>
              </Link>
            </div>
          </div>
          <div className="sm:text-lg sm:leading-5	px-6 font-base font-semibold bg-white leading-1.2">
            Sold for {bidPrice && bidPrice} ETH{" "}
            <span className="text-gray-700">
              ${bidPrice && (bidPrice * ethPrice).toFixed(2)}
            </span>
          </div>
          <div className="sm:text-base sm:leading-5	font-normal text-gray-500 text-sm leading-none">
            {`${moment(activity.createdAt).format("LL")} at ${moment(
              activity.createdAt
            ).format("LT")}`}
          </div>
        </div>
      </div>
      <div className="sm:bottom-14 z-10 h-px w-full left-0 bottom-10 absolute bg-gray-300"></div>
    </div>
  );
};
