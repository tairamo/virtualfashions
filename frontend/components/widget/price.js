import { useETH } from "../../context/ETH";

export const PriceWidget = ({ bidPrice, small }) => {
  const { ethPrice } = useETH();

  return (
    <div>
      <div
        className={`leading-1.2 mb-2.5 font-semibold ${
          small ? "text-2xl" : "lg:text-4xl text-2xl"
        }`}
      >
        {bidPrice} ETH
      </div>
      <div
        className={`leading-1.25 font-semibold text-gray-500 ${
          small ? "text-base" : "text-lg"
        }`}
      >
        ${(bidPrice * ethPrice).toFixed(2)}
      </div>
    </div>
  );
};
