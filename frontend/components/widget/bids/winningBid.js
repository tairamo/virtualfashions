import moment from "moment";
import { PriceWidget } from "../price";

export const WinningBid = ({ bidPrice, displayTime, small }) => {
  // {` ${small ? "" : ""}`}
  return (
    <div
      className={`grid gap-6 ${
        small
          ? "grid-cols-160-125 w-24"
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
          Winning Bid
        </div>

        <PriceWidget bidPrice={bidPrice} small={small} />
      </div>
      <div className="relative gap-0.313 grid">
        <div
          className={`leading-none font-semibold ${
            small ? "text-base" : "text-base"
          }`}
        >
          Auction ended
        </div>
        {/* for hours, minutes and seconds only add grid-cols-65px gap-4*/}
        <div className={`grid grid-cols-1sm ${small ? "gap-4" : "gap-6"}`}>
          <div className="">
            <div
              className={`leading-1.2 font-semibold mb-2.5 ${
                small ? "text-xl" : "text-2xl lg:text-4xl"
              }`}
            >
              {moment(displayTime).format("MMM DD")}
            </div>
            <div
              className={`text-gray-500 leading-1.2 font-semibold ${
                small ? "text-base" : "text-base"
              }`}
            >
              {moment(displayTime).format("YYYY")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
