import moment from "moment";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "../../../utils/auth";
import { useETH } from "../../../context/ETH";
import Web3Instance from "../../../utils/web3";
import Layout from "../../../components/layout";
import { Video } from "../../../components/widget/video";
import { Image } from "../../../components/widget/image";
import { ErrorMsg } from "../../../components/alerts/error";
import { SoldWidget } from "../../../components/widget/sold";
import { UserWidget } from "../../../components/widget/user";
import { Button } from "../../../components/ui/Button/Button";
import NiftyService from "../../../services/api/NiftyService";
import { SuccessMsg } from "../../../components/alerts/success";
import { UnsoldWidget } from "../../../components/widget/unsold";
import { Activity } from "../../../components/activity/activity";
import { Spinner } from "../../../components/ui/Spinner/Spinner";
import { CurrentBid } from "../../../components/widget/bids/bid";
import AuctionService from "../../../services/api/AuctionService";
import { auctionWonDelay, bidDuration } from "../../../utils/general";
import { ReactComponent as GotoIcon } from "../../../public/icons/goto.svg";
import { ReactComponent as IPFSIcon } from "../../../public/icons/ipfs.svg";
import AuctionResultService from "../../../services/api/AuctionResultService";
import { ReactComponent as EtherscanIcon } from "../../../public/icons/etherscan.svg";
import { ReactComponent as IPFSMeatadataICon } from "../../../public/icons/ipfs-metadata.svg";
import {
  INTERVAL,
  PLACE_A_BID,
  WALLET_ERROR,
  AUCTION_ENDED,
  CHAINID_ERROR,
  TRANSFER_ART,
  TOKEN_TRANSFER_ERROR,
  AUCTION_SETTLED_ERROR,
  AUCTION_ALREADY_SETTLED,
  DEFAULT_PROFILE_IMAGE_URL,
} from "../../../constants";

const web3 = new Web3Instance();

function ANifty({ nifty, niftyMetadata, auctionResult }) {
  const interval = useRef();
  const router = useRouter();
  const { user } = useAuth();
  const { ETHAccount, chainId } = useETH();
  const { auction, activities } = nifty;

  let bidPrice = 0;
  let lastBibCreatedBy = "";

  if (auction?.bids?.length > 0) {
    bidPrice = auction.bids[0].bidETH.toFixed(2);
    lastBibCreatedBy = auction.bids[0].createdBy._id;
  }

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [displayTime, setDisplayTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const biddingEndDate = moment(auction?.biddingEndDate);

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

  // Transfer NFT click handler function
  const onNiftyTransfer = async () => {
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

      // Reload page
      router.reload();
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

        // Reload page
        router.reload();
      }

      // Show error message
      toast.error(<ErrorMsg msg={errMsg} />);
    } finally {
      // Set is loading state
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup function
    const load = () => {
      const duration = bidDuration(biddingEndDate);
      setBidDuration(duration);
    };

    load();
    interval.current = setInterval(() => load(), INTERVAL);

    return () => clearInterval(interval.current);
  }, []);

  let profileImage = DEFAULT_PROFILE_IMAGE_URL;
  if (nifty?.user?.profileUrl) {
    profileImage = nifty.user.profileUrl;
  }

  let isDisabled = false;
  let buttonText = TRANSFER_ART;
  if (!ETHAccount) {
    buttonText = WALLET_ERROR;
    isDisabled = true;
  } else if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
    buttonText = CHAINID_ERROR;
    isDisabled = true;
  }

  let auctionWon = false;
  if (auctionWonDelay(auction?.biddingEndDate)) {
    auctionWon = true;
  }

  let auctionDetail = (
    <div className="grid gap-8 shadow-3xl rounded-md bg-white relative">
      <div
        className={`px-8 ${
          (user?._id != auction?.createdBy?._id &&
            displayTime !== AUCTION_ENDED) ||
          (user?._id === auction?.createdBy?._id && auctionWon)
            ? "pt-8"
            : "py-8"
        }`}
      >
        <CurrentBid displayTime={displayTime} bidPrice={bidPrice} />
      </div>
      {user?._id != auction?.createdBy?._id && displayTime !== AUCTION_ENDED && (
        <div className="border-t border-gray-300 px-8 py-8 grid">
          <Button
            text={PLACE_A_BID}
            className="md:px-6 py-4 px-8 appearance-none inline-block text-center font-semibold rounded-xl transition-all duration-300 ease-trans-expo outline-none bg-black text-white border-2 border-black min-h-3.75 w-full hover:shadow-btn transform-2px"
            onClick={() =>
              router.push(`/${auction?.createdBy?.username}/${nifty?._id}/bid`)
            }
          />
        </div>
      )}
    </div>
  );

  if (
    auctionWon &&
    auction?.createdBy?._id === user?._id &&
    user?._id === nifty?.ownedBy?._id &&
    auction?.bids.length > 0
  ) {
    auctionDetail = (
      <div className="grid gap-8 shadow-3xl rounded-md bg-white relative">
        <div
          className={`px-8 ${
            (user?._id != auction?.createdBy?._id &&
              displayTime !== AUCTION_ENDED) ||
            (user?._id === auction?.createdBy?._id && auctionWon)
              ? "pt-8"
              : "py-8"
          }`}
        >
          <CurrentBid displayTime={displayTime} bidPrice={bidPrice} />
        </div>
        {user?._id === auction?.createdBy?._id && auctionWon && (
          <div className="border-t border-gray-300 px-8 py-8 grid">
            <Button
              text={buttonText}
              isSubmitting={isLoading}
              onClick={onNiftyTransfer}
              disabled={isLoading || isDisabled}
              className={`md:px-6 py-4 px-8 appearance-none inline-block text-center font-semibold rounded-xl transition-all duration-300 ease-trans-expo outline-none bg-black text-white border-2 border-black min-h-3.75 w-full  ${
                isLoading || isDisabled
                  ? "cursor-default"
                  : "hover:shadow-btn transform-2px"
              }`}
            />
          </div>
        )}
      </div>
    );
  } else if (auctionResult?.status === "Won") {
    auctionDetail = <SoldWidget bid={auctionResult.bid} />;
  } else if (auctionResult?.status === "Unsold") {
    auctionDetail = <UnsoldWidget auction={auctionResult.auction} />;
  }

  let file = (
    <div className="relative">
      <Image
        alt={nifty?.title}
        url={nifty?.url}
        className="max-w-full block w-full h-full object-contain"
      />
    </div>
  );

  if (nifty?.contentType?.includes("video")) {
    file = (
      <div className="flex justify-center w-full">
        <div className="flex relative">
          <Video
            url={nifty?.url}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`max-w-full block w-full h-full object-contain ${
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
    <Layout>
      <div className="md:flex md:h-calc230px box-border m-0 min-w-0 relative flex-col flex-1">
        <div className="md:min-h-0 bg-gray-200 flex relative flex-1 min-h-66vh">
          <div className="md:min-h-0 md:max-h-72 md:mx-calc md:mb-calc md:mt-10 flex w-full min-h-66vh mx-6 mb-12 place-content-center	">
            {file}
            {/* <div className="absolute bottom-0 right-0 pr-6 pb-12">
              <button className="ml-2 appearance-none	bg-opacityOnly rounded-full h-9 w-9 p-0 cursor-pointer outline-none">
                <div className="flex">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-full mx-auto"
                  >
                    <path
                      d="M9 2h3.6l-4 4L10 7.4l4-4V7h2V0H9v2zM6 8.6l-4 4V9H0v7h7v-2H3.4l4-4L6 8.6z"
                      fill="#fff"
                    ></path>
                  </svg>
                </div>
              </button>
            </div> */}
          </div>
        </div>

        <div className="dl:gap-12 md:grid md:grid-cols-1fr-1fr w-full mx-auto px-6 transform -translate-y-6	flex gap-4 -mb-6 relative z-10">
          <UserWidget user={nifty?.user} image={profileImage} />
        </div>
      </div>

      <div className="box-border m-0 min-w-0 w-full mx-auto px-6">
        <div className="md:grid-cols-2sm dl:gap-12 grid gap-8 grid-cols-1sm">
          <div className="">
            <div className="sm:pb-8 pb-4 z-10 relative">
              <div className="block items-end flex-3">
                <h2 className="md:text-5xl text-4xl leading-tight	tracking-tight font-semibold my-6 break-words">
                  {nifty?.title}
                </h2>
              </div>
            </div>
            <div className="md:gap-12 grid gap-8">
              <div>
                <div className="text-base mb-2 font-semibold">Description</div>
                <div className="text-base font-normal leading-relaxed	max-w-27">
                  {nifty?.about}
                </div>
              </div>
              <div className="grid gap-2 max-w-25">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${process.env.NEXT_PUBLIC_ETHER_SCAN_URL}/token/${process.env.NEXT_PUBLIC_AUCTION_NIFTY_CONTRACT_ADDRESS}?a=${nifty?.chainInfo?.id}`}
                  className="bg-white relative flex shadow-3xl rounded-md p-5 items-center transition-all duration-300 ease-trans-expo no-underline text-gray-600 cursor-pointer z-10 transform-2px hover:shadow-ho3xl hover:text-black"
                >
                  <span className="text-black min-w-2.5">
                    <EtherscanIcon />
                  </span>
                  <div className="text-base font-semibold text-black">
                    View on Etherscan
                  </div>
                  <div className="ml-auto">
                    <GotoIcon />
                  </div>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={niftyMetadata?.image}
                  className="bg-white relative flex shadow-3xl rounded-md p-5 items-center transition-all duration-300 ease-trans-expo no-underline text-gray-600 cursor-pointer z-10 transform-2px hover:shadow-ho3xl hover:text-black"
                >
                  <span className="text-black min-w-2.5">
                    <IPFSIcon />
                  </span>
                  <div className="text-base font-semibold text-black">
                    View File
                  </div>
                  <div className="ml-auto">
                    <GotoIcon />
                  </div>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${process.env.NEXT_PUBLIC_API_URL}/niftys/${nifty._id}/metadata`}
                  className="bg-white relative flex shadow-3xl rounded-md p-5 items-center transition-all duration-300 ease-trans-expo no-underline text-gray-600 cursor-pointer z-10 transform-2px hover:shadow-ho3xl hover:text-black"
                >
                  <span className="text-black min-w-2.5">
                    <IPFSMeatadataICon />
                  </span>
                  <div className="text-base font-semibold text-black">
                    View Meatadata
                  </div>
                  <div className="ml-auto">
                    <GotoIcon />
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="md:pt-12 md:max-w-38.75 z-10 w-full ml-auto flex-auto">
            <div className="flex-1 z-2 relative grid gap-8">
              {auction && auctionDetail}

              <div className="grid gap-6">
                <h2 className="font-semibold font-2xl">Activity</h2>
                <div className="grid gap-2.5">
                  {/* Activities */}
                  {(activities || []).map((activity) => (
                    <Activity
                      auction={auction}
                      key={activity._id}
                      activity={activity}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:pt-24 md:pt-32 pt-12 mb-8">
          <h2 className="sm:mb-12 mb-8 text-2xl font-semibold border-b border-black pb-6">
            Creator
          </h2>
          <div className="dl:grid-cols-2sm md:gap-12 grid-cols-1sm grid gap-8 items-start">
            <div className="sm:grid-cols-120px sm:gap-8 grid items-center grid-cols-80px gap-4">
              <Link href={`/${nifty?.user?.username}`}>
                <div className="shadow-ho3xl transition-all duration-300 ease-trans-expo rounded-full cursor-pointer transform-2px hover:shadow-0.15">
                  <div
                    className="sm:h-7.5 sm:w-7.5 h-20 w-20 bg-gray-200 bg-center bg-cover rounded-full"
                    style={{ backgroundImage: `url(${profileImage})` }}
                  ></div>
                </div>
              </Link>
              <div className="">
                <Link href={`/${nifty?.user?.username}`} passHref>
                  <a className="md:text-2.875 md:leading-3rem sm:mb-2 sm:text text-4xl block mb-1.5	text-2xl font-semibold tracking-tight	no-underline text-black transition-all duration-300 ease-trans-expo">
                    {nifty?.user?.fullname}
                  </a>
                </Link>
                <div className="flex font-semibold text-2xl">
                  <Link href={`/${nifty?.user?.username}`}>
                    <div className="text-brand">@{nifty?.user?.username}</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="sm:text-2xl leading-1.3 text-lg font-medium">
              {nifty?.user?.bio}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    let auctionResult = {};

    // Nifty
    const { data: nifty } = await NiftyService.fetchNifty(
      params.username,
      params.niftyId
    );

    // Nifty metadata
    const { data: niftyMetadata } = await NiftyService.fetchNiftyMetadata(
      params.niftyId
    );

    const isAuctionEnded =
      moment(moment(nifty?.auction?.biddingEndDate)).valueOf() <
      new Date().getTime();

    // Fetch auction result if auction is closed
    if (isAuctionEnded) {
      const { data } = await AuctionResultService.fetchAuctionResult(
        nifty.auction._id
      );

      auctionResult = data;
    }

    return {
      props: {
        nifty,
        niftyMetadata,
        auctionResult,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: {
        nifty: {},
        niftyMetadata: {},
        auctionResult: {},
      },
    };
  }
}

export default ANifty;
