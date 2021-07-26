import moment from "moment";
import Link from "next/link";

import { useETH } from "../../../context/ETH";
import { DEFAULT_PROFILE_IMAGE_URL } from "../../../constants";
import { ReactComponent as GotoIcon } from "../../../public/icons/goto.svg";

export const ActivityList = ({ event, bidPrice, activity }) => {
  const { user, data } = activity;
  const { ethPrice } = useETH();

  return (
    <div className="sm:px-6 sm:items-center flex p-5 rounded-md bg-white relative shadow-3xl">
      <div className="mr-4">
        <div className="cursor-pointer">
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
      </div>
      <div className="sm:flex sm:flex-row sm:gap-0 gap-2.5 flex-1 flex-col grid">
        <div className="flex flex-1 sm:order-1 sm:mr-6 order-2">
          <div className="sm:text-base sm:leading-1.4 sm:mr-0 sm:gap-0.5 mr-8 grid leading-1.4 gap-2.5 text-sm">
            <div className="font-semibold">
              {event}
              <div className="inline-block cursor-pointer text-gray-500 hover:text-black transition-all duration-300 ease-trans-expo">
                <Link href={`/${user?.username}`}>
                  <div className="flex sm:text-base sm:leading-1.4 font-semibold relative -top-0.5 text-sm">
                    @{user?.username || ""}
                  </div>
                </Link>
              </div>
            </div>
            <div className="sm:text-base sm:leading-1.4 text-xs text-gray-500 font-normal">
              {`${moment(activity.createdAt).format("LL")} at ${moment(
                activity.createdAt
              ).format("LT")}`}
            </div>
          </div>
        </div>
        {bidPrice && (
          <div className="sm:items-center sm:order-2 flex order-1">
            <div className="sm:flex-col flex text-right justify-between flex-1">
              <div className="sm:text-lg sm:leading-1.3 mb-0.5 font-semibold text-base leading-none">
                {bidPrice ? `${bidPrice} ETH` : ""}
              </div>
              <div className="text-gray-700 leading-none text-base font-semibold sm:text-base sm:leading-1.3">
                ${bidPrice ? `${(bidPrice * ethPrice).toFixed(2)}` : ""}
              </div>
            </div>
          </div>
        )}
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={`${process.env.NEXT_PUBLIC_ETHER_SCAN_URL}/tx/${data?.chainInfo?.txId}`}
        className="absolute flex items-center no-underline text-gray-600 cursor-pointer z-10 sm:ml-6 sm:relative sm:right-0 sm:bottom-0 right-5 bottom-5 hover:text-black transition-all duration-300 ease-trans-expo"
      >
        <GotoIcon />
      </a>
    </div>
  );
};
