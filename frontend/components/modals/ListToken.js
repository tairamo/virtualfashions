import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Video } from "../widget/video";
import { Image } from "../widget/image";
import { ErrorMsg } from "../alerts/error";
import { useAuth } from "../../utils/auth";
import { useETH } from "../../context/ETH";
import Web3Instance from "../../utils/web3";
import { SuccessMsg } from "../alerts/success";
import { Spinner } from "../ui/Spinner/Spinner";
import { Button } from "../ui/Button";
import UserService from "../../services/api/UserService";
import { creactAuctionSchema } from "../../schema/auction";
import ActionService from "../../services/api/AuctionService";
import Datepicker from "../ui/Datepicker/Datepicker";
import {
  WALLET_ERROR,
  CHAINID_ERROR,
  REQUEST_LISTING,
  TOKEN_LISTED_SUCCESS,
  REQUEST_LISTING_ERROR,
} from "../../constants";

const web3 = new Web3Instance();

export const ListToken = ({ modal, showModal }) => {
  const { payload: token } = modal;
  const { ETHAccount, ethPrice, chainId } = useETH();
  const { user } = useAuth();
  const router = useRouter();

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(creactAuctionSchema),
  });

  const submitHandler = async (values) => {
    try {
      if (!ETHAccount) throw new Error(WALLET_ERROR);
      if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID)
        throw new Error(CHAINID_ERROR);

      const { minimumBid, biddingEndDate } = values;

      // List item method of auction manager contract
      const tokenId = token.chainInfo.id;
      const biddingEndTimeStamp = moment.unix(biddingEndDate).unix();
      const data = await web3.listToken(
        tokenId,
        biddingEndTimeStamp,
        ETHAccount
      );

      const listId = data.events.ItemListed.returnValues._listId;

      // Approve method of ERC721 contract
      await web3.approveTransfer(tokenId, ETHAccount);

      const auctionData = {
        chainInfo: { ...token.chainInfo, txId: data.transactionHash, listId },
        tokenId: token._id,
        minimumBid: minimumBid,
        biddingEndDate,
      };

      // Create auction
      await ActionService.createAuction(auctionData);

      const updateData = { isCreator: true };

      // Update user
      UserService.updateUser(user._id, { updateData });

      toast.success(<SuccessMsg msg={TOKEN_LISTED_SUCCESS} />);

      // Redirect to token page
      router.push(`/${user.username}/${token._id}`);
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
          errMsg = REQUEST_LISTING_ERROR;
          break;
      }

      toast.error(<ErrorMsg msg={errMsg} />);
    } finally {
      showModal();
    }
  };

  const formValues = getValues();
  const biddingEndDate = formValues?.biddingEndDate
    ? moment.unix(formValues.biddingEndDate)
    : null;

  const minimumBidUSD = (formValues?.minimumBid || 0) * ethPrice;

  let isDisabled = false;
  let buttonText = REQUEST_LISTING;
  if (!ETHAccount) {
    buttonText = WALLET_ERROR;
    isDisabled = true;
  } else if (chainId !== process.env.NEXT_PUBLIC_CHAIN_ID) {
    buttonText = CHAINID_ERROR;
    isDisabled = true;
  }

  let file = (
    <Image
      alt={token?.title}
      url={token?.url}
      className="box-border bg-cover bd-gray-300 m-0 min-w-0 opacity-1 max-w-full h-full w-full object-cover block"
    />
  );

  if (token?.contentType?.includes("video")) {
    file = (
      <div className="flex justify-center w-full h-full">
        <div className="flex relative">
          <Video
            url={token?.url}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`box-border bg-cover bd-gray-300 m-0 min-w-0 opacity-1 max-w-full h-full w-full object-cover block ${
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
    <div className="grid gap-4 md:gap-6 dl:grid-cols-2sm grid-cols-1fr min-w-18.75">
      <div className="box-border m-0 min-w-0 bg-gray-200 dl:min-w-16.25 dl:w-full max-w-30 max-h-19.359">
        {file}
      </div>
      <div className="">
        {/* flex flex-col dl:pr-5 dl:w-full  */}
        <div className="grid gap-4 grid-cols-1fr dl:pr-5 dl:w-full ">
          <span className="text-base md:text-xl dl:text-2xl font-bold">
            {token.title}
          </span>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="grid gap-4 grid-cols-1fr"
          >
            <div className="flex flex-col">
              <div className="grid gap-0.5 grid-cols-1fr-1fr">
                <div className="">
                  <div className="relative">
                    <div className="font-normal top-2.5 left-5 text-0.625 pointer-events-none absolute	opacity-100	transform translate-y-px transition-all ease-trans-expo">
                      Minimum Bid
                    </div>
                    <input
                      min="0"
                      type="text"
                      step="0.01"
                      type="number"
                      id="minimumBid"
                      autoComplete="off"
                      placeholder="Ξ 2.4"
                      {...register("minimumBid")}
                      className="appearance-none block w-full px-5 pb-0.5 pt-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:outline-none focus:ring-black focus:border-black min-h-3.75 h-3.75 outline:none shadow-text-area transition-all duration-300 ease-trans-expo"
                      onChange={(e) => {
                        const value = e.target.value;

                        // Set min bid price value
                        setValue("minimumBid", value, {
                          shouldValidate: true,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="pl-3 flex md:text-xl text-base lg:text-2xl font-bold items-center break-all">
                  {minimumBidUSD > 0 ? `$${minimumBidUSD.toFixed(2)}` : "$0.00"}
                </div>
              </div>
              {errors.minimumBid && (
                <p className="text-xs leading-6 text-red-500">
                  {errors.minimumBid.message}
                </p>
              )}
            </div>

            <div className="">
              <div className="relative">
                <div className="font-normal top-2.5 left-5 text-0.625 pointer-events-none absolute	opacity-100	transform translate-y-px transition-all ease-trans-expo z-10">
                  Date
                </div>
                <Datepicker
                  showTimeInput
                  name="biddingEndDate"
                  minDate={new Date()}
                  selected={biddingEndDate?.toDate()}
                  timeInputLabel="Ending Time:"
                  dateFormat="MM/dd/yyyy h:mm aa"
                  placeholderText="mm/dd/yyyy, --:--"
                  onChange={(value) => {
                    const timestamp = moment(value).unix();

                    // Set ending date value
                    setValue("biddingEndDate", timestamp, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              {errors.biddingEndDate && (
                <p className="text-xs leading-6 text-red-500">
                  {errors.biddingEndDate.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              text={buttonText}
              isSubmitting={isSubmitting}
              disabled={isSubmitting || isDisabled}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                isSubmitting || isDisabled ? "opacity-50 cursor-default" : ""
              }`}
            />

            {/* {!ETHAccount && (
              <div
                onClick={connectWallet}
                className="text-sm text-center text-black pt-1 cursor-pointer mx-auto w-max"
              >
                {WALLET_ERROR}
              </div>
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
};
