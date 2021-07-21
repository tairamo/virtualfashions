import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { useAuth } from "../../../utils/auth";
import { useETH } from "../../../context/ETH";
import Web3Instance from "../../../utils/web3";
import Layout from "../../../components/layout";
import Card from "../../../components/Cards/card";
import { Loader } from "../../../components/ui/Loader";
import { connectWallet } from "../../../utils/ethereum";
import BidService from "../../../services/api/BidService";
import { ErrorMsg } from "../../../components/alerts/error";
import NiftyService from "../../../services/api/NiftyService";
import { Button } from "../../../components/ui/Button/Button";
import { ReactComponent as Ethericon } from "../../../public/icons/ethicon.svg";
import {
  WALLET_ERROR,
  AUCTION_ENDED,
  BID_PLACING_ERROR,
  SUBMIT,
  NIFTY_SOLD,
  PLEASE_LOGIN,
  ENOUGH_ETH,
} from "../../../constants";

const web3 = new Web3Instance();

function Bid({ nifty }) {
  const { auction } = nifty;
  const { user } = useAuth();
  const router = useRouter();
  const { balance, ETHAccount, ethPrice } = useETH();
  const isAuctionOver =
    new Date(auction?.biddingEndDate).getTime() < new Date().getTime();

  // State
  const [bidValue, setBidValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Submit");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  // On input change
  const onInputChange = (e) => {
    let value = e.target.value;

    if (!value || value === "") {
      value = "0";
    }

    // Set bid value state
    setBidValue(parseFloat(value));
  };

  // On submit handler function
  const onSumbitHandler = async () => {
    try {
      if (!ETHAccount) throw new Error(WALLET_ERROR);
      if (isAuctionOver) throw new Error(AUCTION_ENDED);

      // Set show loading state
      setIsLoading(true);

      const etherValue = web3.convertToWei(`${bidValue}`, "ether");

      // Call web3 bid on item method
      const data = await web3.bidOnItem(
        auction.chainInfo.listId,
        ETHAccount,
        etherValue
      );

      const bidQuery = {
        auctionId: auction._id,
        bidETH: bidValue,
        bidUSD: bidValue * ethPrice,
        chainInfo: { ...auction.chainInfo, txId: data.transactionHash },
      };

      // Call bid place function
      await BidService.createBid(bidQuery);

      // Redirect to nifty page
      router.push(`/${nifty.ownedBy?.username}/${nifty._id}`);
    } catch (err) {
      console.log(err);

      let errMsg = "";
      switch (err.message) {
        case WALLET_ERROR:
          errMsg = WALLET_ERROR;
          break;
        case AUCTION_ENDED:
          errMsg = AUCTION_ENDED;
          break;
        default:
          errMsg = BID_PLACING_ERROR;
          break;
      }

      // Show error message
      toast.error(<ErrorMsg msg={errMsg} />);
    } finally {
      // Set show loading state
      setIsLoading(false);
    }
  };

  let minBid = (auction?.minimumBid + 0.1).toFixed(2);
  if (auction?.bids?.length > 0) {
    minBid = (auction.bids[0].bidETH + 0.1).toFixed(2);
  }

  const buttonCondition = () => {
    let text = SUBMIT;
    let isDisabled = false;

    if (auction?.status === "Close") {
      text = NIFTY_SOLD;
      isDisabled = true;
    } else if (isAuctionOver) {
      text = AUCTION_ENDED;
      isDisabled = true;
    } else if (!user) {
      text = PLEASE_LOGIN;
      isDisabled = true;
    } else if (bidValue < minBid) {
      text = `Your bid must be at least ${minBid} ETH`;
      isDisabled = true;
    } else if (!ETHAccount) {
      text = WALLET_ERROR;
      isDisabled = true;
    } else if (balance < bidValue) {
      text = ENOUGH_ETH;
      isDisabled = true;
    }

    // Set button text state
    setButtonText(text);

    // Set is button disabled state
    setIsButtonDisabled(isDisabled);
  };

  useEffect(() => {
    // Call button condition function
    buttonCondition();
  }, [bidValue, user]);

  if (user?._id === auction?.createdBy?._id) {
    router.push(`/${auction?.createdBy?.username}/${nifty?._id}`);
    return LoaderComponent;
  }

  return (
    <Layout>
      <div className="md:grid md:gap-24 md:grid-cols-340px-400px flex-1 flex-col items-center mx-auto flex justify-center">
        <div className="">
          <div className="md:max-w-none	max-w-21.25">
            <Card nifty={nifty} auction={auction} bid={auction?.bids?.[0]} />
          </div>
        </div>
        <div className="md:px-0 md:pb-0 md:mt-0 mt-4 px-6 pb-8 ">
          <div className="grid gap-4">
            <h2 className="md:text-left md:justify-start text-2.875 text-4xl tracking-tight	leading-1.15 font-semibold text-center">
              Place a bid
            </h2>
            <div className="w-full">
              <div className="grid gap-6">
                <div className="grid gap-2.5">
                  <div className="grid gap-6">
                    <div className="md:text-left grid gap-2.5 text-center">
                      <div className="text-lg leading-1.2 font-semibold text-brand-666666">
                        You must bid at least
                      </div>
                      <div className="text-lg leading-1.2 font-semibold">
                        {minBid} ETH
                      </div>
                    </div>
                    <div className="relative text-2.875">
                      <div className="rounded-18px bg-black flex">
                        <div className="m-0 min-w-0">
                          <input
                            min="0"
                            autoFocus
                            step="0.01"
                            type="number"
                            value={bidValue}
                            onChange={onInputChange}
                            className="block w-full text-2.875 appearance-none leading-none bg-white border-4 border-white rounded-2xl min-h-4.375 py-0 px-4 outline-none shadow-pink-3xl transition-all duration-300 ease-trans-expo ring-0 focus:shadow-ho3xl focus:border-black"
                          />
                        </div>
                        <div className="flex-shrink-0 min-w-6.875 items-center px-4 flex">
                          <div className="md:text-4xl md:leading-1.2 mr-2.5 text-2xl leading-1.2 tracking-0.01 font-semibold text-white relative -top-0.5">
                            ETH
                          </div>
                          <Ethericon className="block flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="text-brand-666666 font-semibold font-base leading-1.2">
                      ${(bidValue * ethPrice).toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="md:gap-8 grid gap-6">
                  <div className="flex rounded-xl justify-between items-center py-5 pr-5 pl-6 bg-brand-E6E6E6">
                    <div className="text-brand-666666 font-base font-semibold">
                      Your Balance
                    </div>
                    <div className="flex items-center min-h-1.625">
                      <div className="text-lg leading-1.2 font-semibold">
                        {ETHAccount ? (
                          `${balance} ETH`
                        ) : (
                          <div
                            onClick={connectWallet}
                            className="text-sm text-center text-black cursor-pointer w-max"
                          >
                            {WALLET_ERROR}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="md:text-left md:mx-0 text-center mx-auto max-w-20">
                    <div className="grid gap-2.5">
                      <div className="text-base font-normal leading-1.7">
                        Once a bid is placed, it cannot be withdrawn.
                      </div>
                      {/* <div className="md:justify-start flex justify-center">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="outline-none no-underline text-black "
                          href="https://help.foundation.app/en/articles/4742997-a-complete-guide-to-collecting-nfts-and-how-auctions-work"
                        >
                          <div className="text-base leading-1.7 transition-all duration-300 ease-trans-expo cursor-pointer font-semibold text-brand-666666 text-center hover:text-black">
                            Learn how our auctions work.
                          </div>
                        </a>
                      </div> */}
                    </div>
                  </div>
                  <div className="md:max-w-20 w-full">
                    <Button
                      text={buttonText}
                      isSubmitting={isLoading}
                      onClick={onSumbitHandler}
                      disabled={isButtonDisabled}
                      className={`md:py-4 px-6 rounded-2xl appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 h-3.75 w-full leading-1.2 focus:outline-none text-white bg-black ${
                        isButtonDisabled
                          ? "opacity-50 cursor-default"
                          : "border-black transition-all duration-300 ease-trans-expo hover:shadow-btn transform-2px"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    // Nifty
    const { data: nifty } = await NiftyService.fetchNifty(
      params.username,
      params.niftyId
    );

    return {
      props: {
        nifty,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: {
        nifty: {},
      },
    };
  }
}

export default Bid;
