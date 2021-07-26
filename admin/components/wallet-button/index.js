import { connectWallet } from "../../utils/ethereum";

const WalletButton = () => {
  return (
    <button
      onClick={connectWallet}
      className="text-sm md:text-base md:h-full md:px-5 px-1.5 py-1.5 text-center font-semibold transition-all duration-300 ease-trans-expo outline-none bg-black flex items-center rounded-full text-white border-2 border-black hover:shadow-ho3xl transform-2px"
    >
      Connect Wallet
    </button>
  );
};

export default WalletButton;
