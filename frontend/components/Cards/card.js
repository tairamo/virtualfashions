import moment from "moment";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { Video } from "../widget/video";
import { Image } from "../widget/image";
import Loading from "../loading/Spinner";
import { useETH } from "../../context/ETH";
import { ErrorMsg } from "../alerts/error";
import { useAuth } from "../../utils/auth";
import Web3Instance from "../../utils/web3";
import { SuccessMsg } from "../alerts/success";
import { useModal } from "../../context/Modal";
import NiftyService from "../../services/api/NiftyService";
import { bidDuration, counterTime, auctionWonDelay } from "../../utils/general";
import {
  INTERVAL,
  WALLET_ERROR,
  AUCTION_ENDED,
  CHAINID_ERROR,
  MINTING_ERROR,
  MODAL_LIST_NIFTY,
  NIFTY_MINTED_SUCCESS,
  DEFAULT_PROFILE_IMAGE_URL,
} from "../../constants";

const web3 = new Web3Instance();

export default function Cards({
  auction,
  nifty,
  bid,
  collected,
  created,
  openAuction,
}) {
  const interval = useRef();
  const { user } = useAuth();
  const router = useRouter();
  const { showModal } = useModal();
  const { ETHAccount, chainId } = useETH();

  const [isLoading, setIsLoading] = useState(false);
  const [displayTime, setDisplayTime] = useState("");
  const biddingEndDate = moment(
    collected ? openAuction?.biddingEndDate : auction?.biddingEndDate
  );

  const setBidDuration = (duration) => {
    if (!duration) return;

    if (duration.asSeconds() <= 0) {
      // Clear interval
      clearInterval(interval.current);

      // Set display time state
      return setDisplayTime(AUCTION_ENDED);
    }

    const days = counterTime("days", duration, "d");
    const hours = counterTime("hours", duration, "h");
    const minutes = counterTime("minutes", duration, "m");
    const seconds = counterTime("seconds", duration, "s");

    // Set display time state
    setDisplayTime(`${days} ${hours} ${minutes} ${seconds}`);
  };

  // Call on mint click handler
  const onMintClickHandler = async () => {
    try {
      if (!ETHAccount) throw new Error(WALLET_ERROR);
      if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID)
        throw new Error(CHAINID_ERROR);

      // Set show loader
      setIsLoading(true);

      const tokenURI = `${process.env.NEXT_PUBLIC_API_URL}/niftys/${nifty._id}/metadata`;

      // Mint nifty
      const data = await web3.mintNifty(ETHAccount, tokenURI);
      const tokenId = data.events.Transfer.returnValues.tokenId;
      const txId = data.transactionHash;

      const chainInfo = {
        txId,
        id: tokenId,
        tokenURI,
      };

      // Update nifty chain info
      await NiftyService.updateNifty(nifty._id, {
        chainInfo,
      });

      // Show success message
      toast.success(<SuccessMsg msg={NIFTY_MINTED_SUCCESS} />);

      // Set show loader
      setIsLoading(false);

      // Reload page
      router.reload();
    } catch (err) {
      console.error(err);

      let errMsg = "";
      switch (err.message) {
        case WALLET_ERROR:
          errMsg = WALLET_ERROR;
          break;
        case CHAINID_ERROR:
          errMsg = CHAINID_ERROR;
          break;
        default:
          errMsg = MINTING_ERROR;
          break;
      }

      // Show error message
      toast.error(<ErrorMsg msg={errMsg} />);

      // Set show loader
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const load = () => {
      const duration = bidDuration(biddingEndDate);
      setBidDuration(duration);
    };

    load();
    interval.current = setInterval(() => load(), INTERVAL);

    return () => clearInterval(interval.current);
  }, []);

  let username = auction?.createdBy?.username;
  if (created) {
    username = nifty?.user?.username;
  }

  let profileImage = DEFAULT_PROFILE_IMAGE_URL;
  if (created && nifty?.user?.profileUrl) {
    profileImage = nifty.user.profileUrl;
  }

  if (!created && auction?.createdBy?.profileUrl) {
    profileImage = auction.createdBy.profileUrl;
  }

  if (openAuction) {
    auction = openAuction;
    bid = openAuction.bids.length > 0 && openAuction.bids[0];
  }

  let auctionDetail = (
    <div className="box-border m-0 min-w-0 w-full flex bg-black px-3 py-4 justify-around md:px-3 sm:pr-6 sm:px-6 text-white rounded-b-xl md:justify-between sm:justify-around">
      <div className="box-border m-0 min-w-0 mr-6">
        <div className="box-border m-0 min-w-0 text-lg font-semibold mb-2 text-gray-100 leading-none">
          Current bid
        </div>
        <div className="box-border m-0 min-w-0 text-lg font-semibold text-white leading-none">
          {bid ? bid.bidETH?.toFixed(2) : (0).toFixed(2)} ETH
        </div>
      </div>
      <div className="box-border m-0 min-w-0">
        <div className="box-border m-0 min-w-0 text-lg font-semibold mb-2 text-gray-100 leading-none">
          Ending in
        </div>
        <div className="box-border m-0 min-w-0 text-lg font-semibold text-white leading-none">
          {displayTime}
        </div>
      </div>
    </div>
  );

  let auctionWonDelayOver = false;
  if (auctionWonDelay(auction?.biddingEndDate)) {
    auctionWonDelayOver = true;
  }

  if (auctionWonDelayOver) {
    if (collected ? bid : auction?.bids?.length > 0) {
      auctionDetail = (
        <div className="box-border m-0 min-w-0 w-full flex px-3 py-4 justify-around md:px-3 sm:pr-6 sm:px-6 bg-gray-100 text-white rounded-b-xl md:justify-between sm:justify-around">
          <div className="box-border m-0 min-w-0 mr-6">
            <div className="box-border m-0 min-w-0 text-lg font-semibold mb-2 text-gray-500 leading-none">
              Sold for
            </div>
            <div className="box-border m-0 min-w-0 text-lg font-semibold text-black leading-none">
              {bid ? bid.bidETH?.toFixed(2) : (0).toFixed(2)} ETH
            </div>
          </div>
        </div>
      );
    } else if (auctionWonDelayOver) {
      auctionDetail = (
        <div className="box-border m-0 min-w-0 w-full flex px-3 py-4 justify-around md:px-3 sm:pr-6 sm:px-6 bg-gray-700 text-white rounded-b-xl md:justify-between sm:justify-around">
          <div className="box-border m-0 min-w-0 mr-6">
            <div className="box-border m-0 min-w-0 text-lg font-semibold mb-2 text-gray-100 leading-none">
              Bid price
            </div>
            <div className="box-border m-0 min-w-0 text-lg font-semibold text-white leading-none">
              {auction?.minimumBid} ETH
            </div>
          </div>
          <div className="box-border m-0 min-w-0">
            <div className="box-border m-0 min-w-0 text-lg font-semibold mb-2 text-gray-100 leading-none">
              Ended
            </div>
            <div className="box-border m-0 min-w-0 text-lg font-semibold text-white leading-none">
              Unsold
            </div>
          </div>
        </div>
      );
    }
  }

  if (!auction) {
    auctionDetail = (
      <div className="box-border m-0 min-w-0 w-full flex bg-black px-3 py-4 justify-around md:px-3 sm:pr-6 sm:px-6 text-white rounded-b-xl md:justify-between sm:justify-around text-center font-bold">
        <span>Not Listed</span>
      </div>
    );
  }

  let requestListingButton = null;
  const auctionClosed = !auction || auctionWonDelayOver;

  if (
    auctionClosed &&
    (auction?.status === "Close" ||
      (auction?.status === "Open" && auction?.bids?.length === 0) ||
      !auction) &&
    nifty?.ownedBy?._id === user?._id &&
    router.query?.username === user?.username
  ) {
    requestListingButton = (
      <div
        className="box-border m-0 min-w-0 w-full flex bg-black px-3 py-4 justify-around md:px-3 sm:pr-6 sm:px-6 text-white rounded-b-xl md:justify-between sm:justify-around text-center font-bold cursor-pointer"
        onClick={(e) => {
          showModal({
            showCloseBtn: true,
            name: MODAL_LIST_NIFTY,
            payload: { ...nifty },
          });
        }}
      >
        <span className="mx-auto">Request Listing</span>
      </div>
    );
  }

  let mintingButton = null;
  if (
    nifty?.ownedBy?._id === user?._id &&
    !nifty?.chainInfo &&
    router.query?.username === user?.username
  ) {
    mintingButton = isLoading ? (
      <div className="box-border m-0 min-w-0 min-h-6 w-full flex bg-black px-3 py-4 justify-around md:px-3 sm:pr-6 sm:px-6 text-white rounded-b-xl md:justify-between sm:justify-around text-center">
        <Loading />
      </div>
    ) : (
      <div
        className="box-border m-0 min-w-0 w-full flex bg-black px-3 py-4 justify-around md:px-3 sm:pr-6 sm:px-6 text-white rounded-b-xl md:justify-between sm:justify-around text-center font-bold cursor-pointer"
        onClick={onMintClickHandler}
      >
        <span className="mx-auto">Mint</span>
      </div>
    );
  }

  let file = (
    <Image
      alt={nifty?.title}
      url={nifty?.thumbnailUrl}
      className="box-border m-0 min-w-0 opacity-1 max-w-full h-full w-full object-cover block"
    />
  );

  if (nifty?.thumbnailContentType?.includes("video")) {
    file = (
      <Video
        url={nifty?.thumbnailUrl}
        className="box-border m-0 min-w-0 opacity-1 max-w-full h-full w-full object-cover block"
      />
    );
  }

  return (
    <div className="nifty-card box-border m-0 min-w-0 shadow-3xl rounded-xl relative transition-all duration-300 ease-trans-expo overflow-hidden flex flex-col transform-4px hover:shadow-ho3xl">
      <Link href={`/${nifty?.user?.username}/${nifty?._id}`} passHref>
        <a>
          <div className="box-border m-0 min-w-0 relative overflow-hidden">
            <div className="box-border m-0 min-w-0 w-full h-0 pb-100%"></div>
            <div className="box-border m-0 min-w-0 flex justify-center items-center bg-gray-200 inset-0 absolute">
              {file}
            </div>
          </div>
        </a>
      </Link>

      <div className="box-border m-0 min-w-0 grid gap-6 shadow-3xl px-3 py-4 flex-1 bg-white">
        <div className="box-border m-0 min-w-0 flex justify-between">
          <div className="box-border m-0 min-w-0 text-xl font-semibold overflow-ellipsis overflow-hidden">
            <Link href={`/${nifty?.user?.username}/${nifty?._id}`}>
              <div>{nifty?.title}</div>
            </Link>
          </div>
        </div>
        {username && (
          <div className="box-border m-0 min-w-0 flex mt-auto">
            <div className="box-border m-0 min-w-0 flex z-30 relative text-gray-500 transition-all duration-300 ease-trans-expo">
              <div className="box-border m-0 min-w-0 cursor-pointer">
                <Link href={`/${username}`} passHref>
                  <a className="transition duration-300 ease-trans-expo no-underline text-gray-500 hover:text-black">
                    <div className="box-border m-0 min-w-0 mt-3 flex items-center bg-white no-underline">
                      <div
                        className="box-border m-0 min-w-0 bg-cover bg-center rounded-full border-black border-solid w-9 h-9 min-w-2.25 max-w-2.25 min-h-2.25 max-h-2.25"
                        style={{
                          backgroundImage: `url(${profileImage})`,
                        }}
                      ></div>
                      <div className="box-border m-0 min-w-0 flex">
                        <div className="sm:text-base text-sm ml-2 font-semibold no-underline relative -top-0.5">
                          {`@${username}`}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="box-border m-0 min-w-0 flex flex-col">
        {mintingButton || requestListingButton || auctionDetail}
      </div>
    </div>
  );
}
