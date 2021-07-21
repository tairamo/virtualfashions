import { UserWidget } from "./user";
import { useETH } from "../../context/ETH";
import { DEFAULT_PROFILE_IMAGE_URL } from "../../constants";

export const SoldWidget = ({ bid }) => {
  const { ethPrice } = useETH();
  return (
    <div className="grid gap-8 shadow-3xl rounded-md bg-white relative">
      <div className="p-8 grid dl:gap-12 dl:grid-cols-auto-1fr grid-cols-1sm gap-6">
        <div className="pr-8 dl:border-r dl:border-gray-300">
          <div className="text-base leading-tight font-semibold">Sold for</div>
          <div className="lg:text-4xl lg:leading-tight leading-tight mb-2.5 font-semibold text-2xl">
            {bid?.bidETH.toFixed(2)} ETH
          </div>
          <div className="font-semibold text-gray-700">
            ${(bid?.bidETH * ethPrice).toFixed(2)}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-1.5 text-base leading-tight font-semibold">
            Owned By
          </div>
          <div className="my-auto">
            <UserWidget
              user={bid?.createdBy}
              image={bid?.createdBy?.profileUrl || DEFAULT_PROFILE_IMAGE_URL}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
