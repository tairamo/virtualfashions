import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useAuth } from "../../context/auth";
import Layout from "../../components/layout";
import { Loader } from "../../components/ui/Loader";
import { Video } from "../../components/widgets/video";
import { Image } from "../../components/widgets/image";
import { ErrorMsg } from "../../components/alerts/error";
import TokenService from "../../services/api/TokenService";
import { Button } from "../../components/ui/Button/Button";
import { UserWidget } from "../../components/widgets/user";
import { SuccessMsg } from "../../components/alerts/success";
import { Spinner } from "../../components/ui/Spinner/Spinner";
import { Activity } from "../../components/activity/activity";
import { ReactComponent as GotoIcon } from "../../public/icons/goto.svg";
import { ReactComponent as IPFSIcon } from "../../public/icons/ipfs.svg";
import { ReactComponent as EtherscanIcon } from "../../public/icons/etherscan.svg";
import { ReactComponent as IPFSMeatadataICon } from "../../public/icons/ipfs-metadata.svg";
import {
  APPROVED,
  CHANGE_STATUS,
  PENDING_REVIEW,
  ART_FETCHING_ERROR,
  STATUS_UPDATE_ERROR,
  STATUS_UPDATE_SUCCESS,
  DEFAULT_PROFILE_IMAGE_URL,
} from "../../constants";

function AToken(props) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { username, tokenId } = router.query;

  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenMetadata, setTokenMetadata] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const fetchTokenDetail = async (name, id) => {
    try {
      // Set is loading state
      setIsLoading(true);

      // Fetch Tokens
      const { data: token } = await TokenService.fetchToken(name, id);

      // Token metadata
      const { data: tokenMetadata } = await TokenService.fetchTokenMetadata(id);

      // Set token state
      setToken(token);

      // Set token metadata state
      setTokenMetadata(tokenMetadata);
    } catch (err) {
      console.log(err);

      // Show error message
      toast.error(<ErrorMsg msg={ART_FETCHING_ERROR} />);
    } finally {
      // Set is loading state
      setIsLoading(false);
    }
  };

  async function changeStatus(event) {
    event.preventDefault();
    try {
      if (!token || !token.status) return;

      // Set loading state
      setIsLoading(true);

      let newStatus = "";
      if (token.status === APPROVED) {
        newStatus = PENDING_REVIEW;
      } else {
        newStatus = APPROVED;
      }

      // Update token status
      const { data: tokenDetail } = await TokenService.updateToken(token?._id, {
        status: newStatus,
      });

      if (!tokenDetail) {
        throw new Error(STATUS_UPDATE_ERROR);
      }

      // Call send token verified mail api
      TokenService.sendTokenVerified(token?._id);

      const tokenData = {
        ...token,
        status: tokenDetail.status,
      };

      // Set token state
      setToken(tokenData);

      // Set loading state
      setIsLoading(false);

      // Show success message
      toast.success(<SuccessMsg msg={STATUS_UPDATE_SUCCESS} />);
    } catch (err) {
      console.log({ err });

      // Set loading state
      setIsLoading(false);

      // Show error message
      toast.error(<ErrorMsg msg={STATUS_UPDATE_ERROR} />);
    }
  }

  useEffect(() => {
    if (!user || !username || !tokenId) return;

    // Call fetch token detail function
    fetchTokenDetail(username, tokenId);
  }, [username, tokenId, user]);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (loading || isLoading) return LoaderComponent;

  let profileImage = DEFAULT_PROFILE_IMAGE_URL;
  if (token?.user?.profileUrl) {
    profileImage = token.user.profileUrl;
  }

  let file = (
    <div className="relative sm:w-40 w-auto">
      <Image
        alt={token?.title}
        url={token?.url}
        className="max-w-full block w-full h-full object-contain"
      />
    </div>
  );

  if (token?.contentType?.includes("video")) {
    file = (
      <div className="flex justify-center w-full">
        <div className="flex relative">
          <Video
            url={token?.url}
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
          <div className="md:min-h-0 md:max-h-72 md:mx-calc md:mb-calc md:mt-10 flex w-full min-h-66vh mx-6 mb-12 place-content-center">
            {file}
          </div>
        </div>

        <div className="dl:gap-12 md:grid md:grid-cols-1fr-1fr w-full mx-auto px-6 transform -translate-y-6	flex gap-4 -mb-6 relative">
          <UserWidget user={token?.user} image={profileImage} />
        </div>
      </div>

      <div className="box-border m-0 min-w-0 w-full mx-auto px-6">
        <div className="lg:grid-cols-2sm dl:gap-12 grid gap-8 grid-cols-1sm">
          <div className="">
            <div className="sm:pb-8 pb-4 relative">
              <div className="block items-end flex-3">
                <h2 className="md:text-5xl text-4xl leading-tight	tracking-tight font-semibold my-6 break-words">
                  {token?.title}
                </h2>
              </div>
            </div>
            <div className="md:gap-12 grid gap-8">
              <div>
                <div className="text-base mb-2 font-semibold">Description</div>
                <div className="text-base font-normal leading-relaxed	max-w-27">
                  {token?.about}
                </div>
              </div>
              <div className="grid gap-2 max-w-25">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`${process.env.NEXT_PUBLIC_ETHER_SCAN_URL}/token/${process.env.NEXT_PUBLIC_AUCTION_TOKEN_CONTRACT_ADDRESS}?a=${token?.chainInfo?.id}`}
                  className="bg-white relative flex shadow-3xl rounded-md p-5 items-center transition-all duration-300 ease-trans-expo no-underline text-gray-600 cursor-pointer transform-2px hover:shadow-ho3xl hover:text-black"
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
                  href={tokenMetadata?.image}
                  className="bg-white relative flex shadow-3xl rounded-md p-5 items-center transition-all duration-300 ease-trans-expo no-underline text-gray-600 cursor-pointer transform-2px hover:shadow-ho3xl hover:text-black"
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
                  href={`${process.env.NEXT_PUBLIC_API_URL}/tokens/${token?._id}/metadata`}
                  className="bg-white relative flex shadow-3xl rounded-md p-5 items-center transition-all duration-300 ease-trans-expo no-underline text-gray-600 cursor-pointer transform-2px hover:shadow-ho3xl hover:text-black"
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

          <div className="md:pt-6 lg:max-w-38.75 w-full ml-auto flex-auto">
            <div className="flex-1 relative grid gap-8">
              <div className="grid gap-6">
                <div className="mb-2.5">
                  <h1 className="text-lg text-black font-semibold mb-2.5">
                    Status :{" "}
                    <span
                      className={`${
                        token?.status === APPROVED
                          ? "text-pink-600"
                          : "text-gray-600"
                      }`}
                    >
                      {token?.status}
                    </span>{" "}
                  </h1>
                  <Button
                    text={CHANGE_STATUS}
                    disabled={isLoading}
                    onClick={changeStatus}
                    isSubmitting={isLoading}
                    className={`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black shadow-3xl transform-2px transition-all duration-300 ease-trans-expo ${
                      isLoading
                        ? "cursor-default opacity-50"
                        : "hover:shadow-ho3xl"
                    }`}
                  />
                </div>
                <h2 className="font-semibold font-2xl">Activity</h2>
                <div className="grid gap-2.5">
                  {/* Activities */}
                  {(token?.activities || []).map((activity) => (
                    <Activity
                      auction={token?.auction}
                      key={activity._id}
                      activity={activity}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AToken;
