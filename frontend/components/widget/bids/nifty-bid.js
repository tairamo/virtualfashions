import { AUCTION_ENDED } from "../../../constants";
import { PriceWidget } from "../price";

export const NiftyBid = ({ bidPrice, displayTime, small }) => {
  return (
    <div className="sm:flex-row flex flex-col">
      <div
        className={`sm:pr-8 mr-8 sm:border-r sm:border-gray-300 text-left mb-6 whitespace-pre`}
      >
        <div className={`leading-1.2 font-semibold mb-1.5 text-base`}>
          Current Bid
        </div>
        <PriceWidget bidPrice={bidPrice} small={small} />
      </div>

      <div className="text-left max-w-21.25">
        <div className={`leading-none font-semibold text-base mb-1.5`}>
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
          <div className={`grid gap-6 grid-cols-55px`}>
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
            {(displayTime.hours > 0 || displayTime.minutes > 0) && (
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
            {(displayTime.minutes > 0 || displayTime.seconds > 0) && (
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
