import moment from "moment";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { Video } from "../widget/video";
import { Image } from "../widget/image";
import { ErrorMsg } from "../alerts/error";
import { useAuth } from "../../utils/auth";
import { useETH } from "../../context/ETH";
import Web3Instance from "../../utils/web3";
import { Button } from "../ui/Button/Button";
import { PriceWidget } from "../widget/price";
import { SuccessMsg } from "../alerts/success";
import { Spinner } from "../ui/Spinner/Spinner";
import { CurrentBid } from "../widget/bids/bid";
import { WinningBid } from "../widget/bids/winningBid";
import AuctionService from "../../services/api/AuctionService";
import { auctionWonDelay, bidDuration } from "../../utils/general";
import { ReactComponent as CheckmarkIcon } from "../../public/icons/checkmark.svg";
import {
  INTERVAL,
  BID_AGAIN,
  CLAIM_NFT,
  VIEW_NIFTY,
  WALLET_ERROR,
  AUCTION_ENDED,
  CHAINID_ERROR,
  WITHDRAW_ERROR,
  TOKEN_TRANSFER_ERROR,
  AUCTION_SETTLED_ERROR,
  AUCTION_ALREADY_SETTLED,
  DEFAULT_PROFILE_IMAGE_URL,
} from "../../constants";

const web3 = new Web3Instance();

export default function BidCard({ bid }) {
  const router = useRouter();
  const { user } = useAuth();
  const { ETHAccount, chainId } = useETH();
  const { auction, nifty, bids } = bid;

  const interval = useRef();
  const biddingEndDate = moment(auction?.biddingEndDate);

  let latestBidPrice = 0;
  let lastBibCreatedBy = "";

  if (bids.length > 0) {
    latestBidPrice = bids[0].bidETH.toFixed(2);
    lastBibCreatedBy = bids[0].createdBy._id;
  }

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [withdrawAvailable, setWithdrawAvailable] = useState(false);
  const [displayTime, setDisplayTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const setBidDuration = (duration) => {
    if (!duration) return;

    if (duration.asSeconds() <= 0) {
      // Clear interval
      clearInterval(interval.current);

      // Set display time state
      return setDisplayTime(AUCTION_ENDED);
    }

    // Set display time state
    setDisplayTime({
      days: duration.days(),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    });
  };

  // On withdraw click handler
  const onWithdrawClickHandler = async () => {
    try {
      if (!ETHAccount) throw new Error(WALLET_ERROR);
      if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID)
        throw new Error(CHAINID_ERROR);

      // Set is loading state
      setIsLoading(true);

      // Call withdraw method
      const listId = bid?.chainInfo?.listId;
      await web3.withdraw(listId, ETHAccount);

      // Set withdraw state
      setWithdrawAvailable(false);
    } catch (err) {
      console.log(err);

      let errMsg = "";
      switch (err.message) {
        case WALLET_ERROR:
          errMsg = WALLET_ERROR;
          break;
        case CHAINID_ERROR:
          errMsg = CHAINID_ERROR;
          break;
        default:
          errMsg = WITHDRAW_ERROR;
          break;
      }

      // Show error message
      toast.error(<ErrorMsg msg={errMsg} />);
    } finally {
      // Set is loading state
      setIsLoading(false);
    }
  };

  // Claim click handler function
  const onClaimClickHandler = async () => {
    try {
      if (!ETHAccount) throw new Error(WALLET_ERROR);
      if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID)
        throw new Error(CHAINID_ERROR);

      // Set is loading state
      setIsLoading(true);

      // Transfer token
      const listId = auction.chainInfo.listId;
      const data = await web3.settleAuction(listId, ETHAccount);

      const updateData = {
        niftyId: nifty._id,
        userId: lastBibCreatedBy,
        chainInfo: { ...auction.chainInfo, txId: data.transactionHash },
      };

      const { data: result } = await AuctionService.claimAuctionNifty(
        auction._id,
        updateData
      );

      if (result.type === "success") {
        // Show success message
        toast.success(<SuccessMsg msg={result.message} />);
      } else {
        // Show error message
        toast.error(<ErrorMsg msg={result.message} />);
      }

      // Push to user profile
      router.push(`/${user.username}`);
    } catch (err) {
      console.log(err);

      let errMsg = "";
      switch (err.message) {
        case WALLET_ERROR:
          errMsg = WALLET_ERROR;
          break;
        case CHAINID_ERROR:
          errMsg = CHAINID_ERROR;
          break;
        default:
          errMsg = TOKEN_TRANSFER_ERROR;
          break;
      }

      if (err.message.includes(AUCTION_SETTLED_ERROR)) {
        errMsg = AUCTION_ALREADY_SETTLED;

        // Push to user profile
        router.push(`/${user.username}`);
      }

      // Show error message
      toast.error(<ErrorMsg msg={errMsg} />);
    } finally {
      // Set is loading state
      setIsLoading(false);
    }
  };

  let auctionWon = false;
  if (auctionWonDelay(auction?.biddingEndDate)) {
    auctionWon = true;
  }

  useEffect(() => {
    if (!ETHAccount || lastBibCreatedBy === user?._id) return;

    // Get total bid amount to withdraw
    const listId = bid?.chainInfo?.listId;
    web3
      .totalBidAmount(listId, ETHAccount)
      .then((data) => {
        const value = web3.convertBalance(data, "ether");
        if (parseFloat(value) > 0 && auctionWon) {
          // Set withdraw state
          setWithdrawAvailable(true);
        }
      })
      .catch((err) => console.log(err));
  }, [ETHAccount]);

  useEffect(() => {
    const load = () => {
      const duration = bidDuration(biddingEndDate);
      setBidDuration(duration);
    };

    load();
    interval.current = setInterval(() => load(), INTERVAL);

    // Cleanup function
    return () => clearInterval(interval.current);
  }, []);

  let isDisabled = false;
  let buttonText = CLAIM_NFT;
  if (!ETHAccount) {
    buttonText = WALLET_ERROR;
    isDisabled = true;
  } else if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
    buttonText = CHAINID_ERROR;
    isDisabled = true;
  }

  let profileImage = DEFAULT_PROFILE_IMAGE_URL;
  if (auction?.createdBy?.profileUrl) {
    profileImage = auction.createdBy.profileUrl;
  }

  let bidDetails = (
    <div className="grid gap-2.5 lg:grid-cols-1fr md:grid-cols-1fr-1fr grid-cols-1fr items-center sm:max-h-12.625 lg:min-w-18.75 lg:max-w-18.75 pt-2.5">
      <div className="">
        <div className="font-semibold text-lg leading-1.2 mb-2.5">Your Bid</div>
        <PriceWidget bidPrice={bid?.bidETH.toFixed(2)} />
      </div>

      <div className="">
        <Button
          text={VIEW_NIFTY}
          onClick={() => router.push(`/${nifty?.user?.username}/${nifty._id}`)}
          className="md:py-4 px-6 rounded-2xl appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 h-3.75 w-full leading-1.2 focus:outline-none text-black bg-white border-black transition-all duration-300 ease-trans-expo hover:shadow-btn transform-2px hover:bg-black hover:text-white"
        />
      </div>
    </div>
  );

  if (auction?.status === "Close" && nifty.ownedBy === user._id) {
    bidDetails = (
      <div className="grid gap-2.5 lg:grid-cols-1fr md:grid-cols-1fr-1fr grid-cols-1fr items-center sm:max-h-12.625 lg:min-w-18.75 lg:max-w-18.75 pt-2.5">
        <div className="dl:grid gap-2.5 grid-cols-1fr">
          <div className="flex flex-row">
            <div className="mr-2.5">
              <CheckmarkIcon className="text-black" />
            </div>
            <div className="font-semibold text-lg leading-1.2 mb-2.5 text-black">
              Claimed
            </div>
          </div>

          <div className="text-sm leading-relaxed">
            NFT claimed successfully. Nifty added to your collection.
          </div>
        </div>

        <div className="">
          <Button
            text={VIEW_NIFTY}
            onClick={() =>
              router.push(`/${nifty?.user?.username}/${nifty._id}`)
            }
            className="md:py-4 px-6 rounded-2xl appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 h-3.75 w-full leading-1.2 focus:outline-none text-black bg-white border-black transition-all duration-300 ease-trans-expo hover:shadow-btn transform-2px hover:bg-black hover:text-white"
          />
        </div>
      </div>
    );
  } else if (
    auctionWon &&
    auction?.status === "Open" &&
    nifty.ownedBy !== user._id &&
    lastBibCreatedBy === user._id
  ) {
    bidDetails = (
      <div className="grid gap-2.5 lg:grid-cols-1fr md:grid-cols-1fr-1fr grid-cols-1fr items-center sm:max-h-12.625 lg:min-w-18.75 lg:max-w-18.75 pt-2.5">
        <div className="dl:grid gap-2.5 grid-cols-1fr">
          <div className="flex flex-row">
            <div className="mr-2.5">
              <CheckmarkIcon className="text-black" />
            </div>
            <div className="font-semibold text-lg leading-1.2 mb-2.5 text-black">
              You won!
            </div>
          </div>

          <div className="text-sm leading-relaxed">
            Congratulations, you won the auction for this nifty. Now claim your
            NFT and add it to your collection.
          </div>
        </div>

        <div className="">
          <Button
            text={buttonText}
            isSubmitting={isLoading}
            onClick={onClaimClickHandler}
            disabled={isLoading || isDisabled}
            className={`md:py-4 px-6 rounded-2xl appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 h-3.75 w-full leading-1.2 focus:outline-none text-white bg-black border-black ${
              isLoading || isDisabled
                ? "cursor-default"
                : "transform-2px hover:shadow-btn transition-all duration-300 ease-trans-expo"
            }`}
          />
        </div>
      </div>
    );
  } else if (withdrawAvailable) {
    bidDetails = (
      <div className="grid gap-2.5 lg:grid-cols-1fr md:grid-cols-1fr-1fr grid-cols-1fr items-center sm:max-h-12.625 lg:min-w-18.75 lg:max-w-18.75 pt-2.5">
        <div className="">
          <div className="font-semibold text-lg leading-1.2 mb-2.5">
            Your Bid
          </div>
          <PriceWidget bidPrice={bid?.bidETH.toFixed(2)} />
        </div>

        <div className="">
          <Button
            isSubmitting={isLoading}
            onClick={onWithdrawClickHandler}
            disabled={isLoading || isDisabled}
            text={isDisabled ? buttonText : "Withdraw"}
            className={`md:py-4 px-6 rounded-2xl appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 h-3.75 w-full leading-1.2 focus:outline-none text-white bg-black border-black ${
              isLoading || isDisabled
                ? "cursor-default"
                : "transform-2px hover:shadow-btn transition-all duration-300 ease-trans-expo"
            }`}
          />
        </div>
      </div>
    );
  } else if (auction?.status === "Open" && displayTime !== AUCTION_ENDED) {
    bidDetails = (
      <div className="grid gap-2.5 lg:grid-cols-1fr md:grid-cols-1fr-1fr grid-cols-1fr items-center sm:max-h-12.625 lg:min-w-18.75 lg:max-w-18.75 pt-2.5">
        <div className="pr-8">
          <div className="font-semibold text-lg leading-1.2 mb-2.5">
            Your Bid
          </div>
          <PriceWidget bidPrice={bid?.bidETH.toFixed(2)} />
        </div>

        <div className="">
          {lastBibCreatedBy !== user._id ? (
            <Button
              text={BID_AGAIN}
              onClick={() =>
                router.push(`/${nifty?.user?.username}/${nifty._id}/bid`)
              }
              className="md:py-4 px-6 rounded-2xl appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 h-3.75 w-full leading-1.2 focus:outline-none text-white bg-black border-black transition-all duration-300 ease-trans-expo hover:shadow-btn transform-2px"
            />
          ) : (
            <Button
              text={VIEW_NIFTY}
              onClick={() =>
                router.push(`/${nifty?.user?.username}/${nifty._id}`)
              }
              className="md:py-4 px-6 rounded-2xl appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 h-3.75 w-full leading-1.2 focus:outline-none text-black bg-white border-black transition-all duration-300 ease-trans-expo hover:shadow-btn transform-2px hover:bg-black hover:text-white"
            />
          )}
        </div>
      </div>
    );
  }

  let file = (
    <Image
      bgImage
      url={nifty?.thumbnailUrl}
      className="bg-cover bg-center bg-gray-200 min-h-12.625 min-w-12.625 max-w-12.625 max-h-12.625 rounded-md overflow-hidden"
    />
  );

  if (nifty?.thumbnailContentType?.includes("video")) {
    file = (
      <div className="flex justify-center w-full">
        <div className="flex relative">
          <Video
            url={nifty?.thumbnailUrl}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`bg-cover bg-center bg-gray-200 min-h-12.625 min-w-12.625 max-w-12.625 max-h-12.625 rounded-md overflow-hidden object-cover ${
              !isVideoLoaded && "filter blur drop-shadow-02020"
            }`}
          />

          {!isVideoLoaded && (
            <div className="opacity-100">
              <div className="absolute transform -translate-y-1/2 -translate-x-1/2 left-2/4 top-2/4">
                <Spinner color="text-black" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-100 min-h-15.625 rounded-md shadow-3xl bg-white">
      <div className="grid gap-8 grid-cols-1fr-auto lg:grid-cols-1fr-auto md:grid-cols-1fr p-6">
        <div className="grid gap-6 md:grid-cols-auto-1fr grid-cols-1fr lg:border-r lg:border-gray-300">
          <div className="cursor-pointer">
            <Link href={`/${nifty?.user?.username}/${nifty._id}`} passHref>
              <a>{file}</a>
            </Link>
          </div>
          {/* flex flex-col justify-between py-2.5 */}
          <div className="grid gap-2.5 grid-cols-1fr py-2.5">
            <div className="mb-1.5">
              <Link href={`/${nifty?.user?.username}/${nifty._id}`}>
                <h2 className="font-semibold text-lg leading-1.2 mb-4 cursor-pointer">
                  {nifty.title}
                </h2>
              </Link>
              <Link href={`/${auction?.createdBy?.username}`}>
                <div className="flex items-center cursor-pointer w-max">
                  <div
                    className="sm:min-w-1.625 sm:min-h-1.625 sm:max-w-1.625 sm:max-h-1.625 w-6 h-6 bg-gray-200 bg-cover bg-center rounded-full"
                    style={{
                      backgroundImage: `url(${profileImage})`,
                    }}
                  ></div>
                  <div className="flex font-semibold relative -top-0.5 text-base text-black leading-1.2 ml-2">
                    @{auction?.createdBy?.username}
                  </div>
                </div>
              </Link>
            </div>

            {auction.status === "Open" ? (
              <CurrentBid
                small
                displayTime={displayTime}
                bidPrice={latestBidPrice}
              />
            ) : (
              <WinningBid
                small
                bidPrice={latestBidPrice}
                displayTime={auction?.biddingEndDate}
              />
            )}
          </div>
        </div>

        {bidDetails}
      </div>
    </div>
  );
}
