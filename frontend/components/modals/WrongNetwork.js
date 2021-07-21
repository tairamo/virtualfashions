import { WRONG_NETWORK } from "../../constants";
import { ReactComponent as CircularArrowIcon } from "../../public/icons/circular-arrow.svg";

export const WrongNetwork = () => {
  return (
    <div className="m-0 min-w-0 py-8">
      <div className="flex justify-center mb-4">
        <CircularArrowIcon />
      </div>
      <h2 className="max-w-13.75 text-center font-semibold text-2xl mx-auto mb-4 text-black">
        {WRONG_NETWORK}
      </h2>
      <div className="mx-auto leading-1.7 text-center max-w-17.5 text-sm text-black">
        Your wallet is currently connected to a different network. Please change
        it to the Ethereum mainnet to continue.
      </div>
    </div>
  );
};
