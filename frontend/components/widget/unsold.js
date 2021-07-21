import { useETH } from "../../context/ETH";
import { useAuth } from "../../utils/auth";

export const UnsoldWidget = ({ auction }) => {
  const { user } = useAuth();
  const { ethPrice } = useETH();

  return (
    <div className="grid gap-8 shadow-3xl rounded-md bg-white relative">
      <div className="p-8 grid dl:gap-12 dl:grid-cols-auto-1fr grid-cols-1sm gap-6">
        <div className="pr-8 dl:border-r dl:border-gray-300">
          <div className="text-base leading-tight font-semibold">Bid price</div>
          <div className="lg:text-4xl lg:leading-tight leading-tight mb-2.5 font-semibold text-2xl">
            {auction?.minimumBid?.toFixed(2)} ETH
          </div>
          <div className="font-semibold text-gray-700">
            ${(auction?.minimumBid * ethPrice).toFixed(2)}
          </div>
        </div>
        <div className="flex flex-col my-auto">
          <div className="mb-1.5 text-base leading-tight font-semibold">
            Unsold
          </div>
          {user?._id === auction?.createdBy && (
            <div className="flex my-auto">
              You are able to re-create auction.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
