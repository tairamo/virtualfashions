import { AUCTION_ENDED } from "../../../constants";
import { PriceWidget } from "../price";

export const CurrentBid = ({ bidPrice, displayTime, small }) => {
  return (
    <div
      className={`grid gap-6 ${
        small
          ? "grid-cols-160-1fr w-24"
          : "dl:gap-12 dl:grid-cols-auto-1fr grid-cols-1sm"
      }`}
    >
      <div
        className={`pr-8 ${
          small ? "border-r border-gray-300" : "dl:border-r dl:border-gray-300"
        }`}
      >
        <div
          className={`leading-1.2 font-semibold mb-1.5 ${
            small ? "text-base" : "text-base"
          }`}
        >
          Current Bid
        </div>
        <PriceWidget bidPrice={bidPrice} small={small} />
      </div>
      <div className="relative gap-0.313 grid">
        <div
          className={`leading-none font-semibold ${
            small ? "text-base" : "text-base"
          }`}
        >
          Auction ending in
        </div>
        {/* for hours, minutes and seconds only add grid-cols-65px gap-4*/}
        {displayTime === AUCTION_ENDED ? (
          <div
            className={`grid font-semibold gap-4 ${
              small ? "grid-cols-120px text-xl" : "grid-cols-160px text-2xl"
            }`}
          >
            {displayTime}
          </div>
        ) : (
          <div
            className={`grid ${
              small ? "gap-4 grid-cols-40px" : "gap-6 grid-cols-55px"
            }`}
          >
            {displayTime.days > 0 && (
              <div className="">
                <div
                  className={`leading-1.2 font-semibold mb-2.5 ${
                    small ? "text-2xl" : "text-2xl lg:text-4xl"
                  }`}
                >
                  {displayTime.days}
                </div>
                <div
                  className={`text-gray-500 leading-1.2 font-semibold ${
                    small ? "text-base" : "text-base"
                  }`}
                >
                  Days
                </div>
              </div>
            )}
            {(displayTime.days > 0 || displayTime.hours > 0) && (
              <div className="">
                <div
                  className={`leading-1.2 font-semibold mb-2.5 ${
                    small ? "text-2xl" : "text-2xl lg:text-4xl"
                  }`}
                >
                  {displayTime.hours}
                </div>
                <div
                  className={`text-gray-500 leading-1.2 font-semibold ${
                    small ? "text-base" : "text-base"
                  }`}
                >
                  Hours
                </div>
              </div>
            )}
            {(displayTime.days > 0 ||
              displayTime.hours > 0 ||
              displayTime.minutes > 0) && (
              <div className="">
                <div
                  className={`leading-1.2 font-semibold mb-2.5 ${
                    small ? "text-2xl" : "text-2xl lg:text-4xl"
                  }`}
                >
                  {displayTime.minutes}
                </div>
                <div
                  className={`text-gray-500 leading-1.2 font-semibold ${
                    small ? "text-base" : "text-base"
                  }`}
                >
                  {small ? "Mins" : "Minutes"}
                </div>
              </div>
            )}
            {(displayTime.days > 0 ||
              displayTime.hours > 0 ||
              displayTime.minutes > 0 ||
              displayTime.seconds > 0) && (
              <div className="">
                <div
                  className={`leading-1.2 font-semibold mb-2.5 ${
                    small ? "text-2xl" : "text-2xl lg:text-4xl"
                  }`}
                >
                  {displayTime.seconds}
                </div>
                <div
                  className={`text-gray-500 leading-1.2 font-semibold ${
                    small ? "text-base" : "text-base"
                  }`}
                >
                  {small ? "Secs" : "Seconds"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
