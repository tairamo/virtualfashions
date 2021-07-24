import moment from "moment";
import Link from "next/link";
import ErrorPage from "next/error";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../config";
import { useAuth } from "../../utils/auth";
import Layout from "../../components/layout";
import Cards from "../../components/Cards/card";
import { Loader } from "../../components/ui/Loader";
import WebUrl from "../../components/web-url/WebUrl";
import { FETCHING_DATA_ERROR } from "../../constants";
import UserService from "../../services/api/UserService";
import TokenService from "../../services/api/TokenService";
import { Spinner } from "../../components/ui/Spinner/Spinner";
import { getBannerUrl, getProfileUrl } from "../../utils/general";

function Profile({
  userData,
  username,
  createdCurrPage,
  createdTokensData,
  createdTotalDocs,
  collectedTokensData,
  collectedCurrPage,
  collectedTotalDocs,
  error,
}) {
  const { user } = useAuth();

  // State
  const [tab, setTab] = useState("");
  const [err, setErr] = useState(error);
  const [isLoading, setIsLoading] = useState(false);
  const [createdTokens, setCreatedTokens] = useState([]);
  const [collectedTokens, setCollectedTokens] = useState([]);
  const [createdCurrentPage, setCreatedCurrPage] = useState(1);
  const [collectedCurrentPage, setCollectedCurrPage] = useState(1);
  const [createdTotalDocuments, setCreatedTotalDocuments] = useState(0);
  const [collectedTotalDocuments, setCollectedTotalDocuments] = useState(0);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  // Fetch created tokens
  const fetchCreatdTokens = async () => {
    try {
      // Set is loading state
      setIsLoading(true);

      const page = createdCurrentPage + 1;

      // fetch auctions
      const { data } = await TokenService.fetchCreatdTokens(userData._id, page);

      // Set created tokens state
      setCreatedTokens(data.createdTokens);

      // Set created documents state
      setCreatedTotalDocuments(data.totalDocuments);

      // Set created current page state
      setCreatedCurrPage(data.currPage);

      // Set is loading state
      setIsLoading(false);
    } catch (err) {
      console.log(err);

      // Set error
      setErr({ message: FETCHING_DATA_ERROR, statusCode: 400 });

      // Set is loading state
      setIsLoading(false);
    }
  };

  // Fetch collected tokens
  const fetchCollectedTokens = async () => {
    try {
      // Set is loading state
      setIsLoading(true);

      const page = collectedCurrentPage + 1;

      // fetch auctions
      const { data } = await TokenService.fetchCollectedTokens(
        userData._id,
        page
      );

      // Set collected tokens state
      setCollectedTokens(data.collectedTokens);

      // Set collected documents state
      setCollectedTotalDocuments(data.totalDocuments);

      // Set collected current page state
      setCollectedCurrPage(data.currPage);

      // Set is loading state
      setIsLoading(false);
    } catch (err) {
      console.log(err);

      // Set error
      setErr({ message: FETCHING_DATA_ERROR, statusCode: 400 });

      // Set is loading state
      setIsLoading(false);
    }
  };

  // On tab change handler
  const onTabChangeHandler = (tab) => {
    // Set loading state
    setIsLoading(false);

    // Set tab state
    setTab(tab);
  };

  // Update states when username changes
  const updateState = () => {
    // Set error state
    setErr(error);

    // Set created tokens state
    setCreatedTokens(createdTokensData);

    // Set collected tokens state
    setCollectedTokens(collectedTokensData);

    // Set created curr page state
    setCreatedCurrPage(createdCurrPage);

    // Set collected curr page state
    setCollectedCurrPage(collectedCurrPage);

    // Set created total docs state
    setCreatedTotalDocuments(createdTotalDocs);

    // Set collected total docs state
    setCollectedTotalDocuments(collectedTotalDocs);

    if (createdTokensData?.length > 0) {
      // Set tab state
      setTab("Created");
    } else if (collectedTokensData?.length > 0) {
      // Set tab state
      setTab("Collected");
    }
  };

  useEffect(() => {
    // Call update state
    updateState();

    // Cleanup function
    return () => {
      // Set tab state
      setTab("Created");
    };
  }, [username]);

  if (!userData) return LoaderComponent;

  let socials;
  if (userData?.socials && Object.entries(userData?.socials).length > 0) {
    socials = Object.entries(userData.socials).map(([key, value]) => {
      if (value && value.length > 0) {
        return <WebUrl url={value} key={key} type={key} />;
      }
    });
  }

  let createdAt;
  if (userData?.createdAt) {
    createdAt = moment(userData.createdAt).format(config.joindedDataFormat);
  }

  if (err?.message && err?.statusCode) {
    return <ErrorPage statusCode={err?.statusCode} title={err?.message} />;
  }

  return (
    <Layout>
      <div>
        <div className="mb-12 pb-17 relative">
          <div className="relative">
            <div
              className="bg-cover bg-no-repeat md:bg-cover sm:bg-cover h-64 bg-transparent box-border"
              style={{ backgroundImage: `url(${getBannerUrl(userData)})` }}
            ></div>
          </div>
          <div className="mx-atuo md:px-14 h-14 box-border px-6">
            <div className="z-20 bottom-0 box-border m-0 min-w-0 flex absolute">
              <div
                className="bg-cover bg-center rounded-full bg-white md:border-8 border-4 border-white border-solid md:w-44 md:h-44 w-32 h-32"
                style={{
                  backgroundImage: `url(${getProfileUrl(userData)})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mb-20">
        <div className="xl:grid-cols-2xl md:grid-cols-2md grid w-full mx-atuo px-6 gap-8 flex-1">
          <div>
            <div className="gap-0.75 grid">
              <div className="grid gap-12">
                <div>
                  <div className="space-y-4">
                    <div className="lg:text-2.875 md:mb-4 sm:mb-2 text-4xl leading-1.1 clip overflow-ellipsis tracking-tighter font-semibold">
                      {userData?.fullname}
                    </div>
                    <div className="lg:text-2xl md:text-xl text-lg flex md:-tracking-0.035em font-semibold overflow-hidden max-w-full">
                      <div className="text-brand overflow-ellipsis leading-1.2">
                        @{userData?.username}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 hover:text-black">
                      {user?._id === userData?._id && (
                        <Link href="/profile/add-details">Edit profile</Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:gap-12 grid gap-8">
                  <div className="">
                    <div className="grid gap-12 ">
                      <div>
                        <div className="leading-none pb-4 mb-4 border-b border-gray-200 text-lg">
                          Bio
                        </div>
                        <div className="text-sm leading-relaxed font-normal text-gray-500">
                          <p>{userData?.bio || "No bio available"}</p>
                        </div>
                      </div>
                      <div className="md:block hidden">
                        <div className="leading-none pb-4 mb-4 border-b border-gray-200 text-lg">
                          Links
                        </div>
                        <div className="md:gap-5 grid gap-4 text-gray-500">
                          {socials || "No social links available"}
                        </div>
                      </div>
                      <div className="items-center flex justify-between	py-4 border-b border-gray-200 mb-4 md:flex hidden">
                        <div className="leading-none text-lg">Joined</div>
                        <div className="font-normal leading-none text-gray-500 text-sm">
                          {createdAt || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:gap-12 sm:gap-8 gap-6 m-0 grid">
            <div className="z-30 relative">
              <div className="md:mb-3 dl:mb-4 mb-3 flex border-b border-gray-200">
                {createdTokens.length > 0 && (
                  <div
                    onClick={() => onTabChangeHandler("Created")}
                    className={`leading-1.2 cursor-pointer transition-all duration-300 trans-expo pb-5 border-b-2 border-transparent text-lg mr-6 -mb-0.5 ${
                      tab === "Created" && "border-black"
                    }`}
                  >
                    Created
                  </div>
                )}
                {collectedTokens.length > 0 && (
                  <div
                    onClick={() => onTabChangeHandler("Collected")}
                    className={`leading-1.2 cursor-pointer transition-all duration-300 trans-expo pb-5 border-b-2 border-transparent text-lg mr-6 -mb-0.5 ${
                      tab === "Collected" && "border-black"
                    }`}
                  >
                    Collected
                  </div>
                )}
              </div>
              {createdTokens?.length > 0 || collectedTokens?.length > 0 ? (
                <div className="z-30 relative">
                  <InfiniteScroll
                    dataLength={
                      tab === "Created"
                        ? createdTokens.length
                        : collectedTokens.length
                    }
                    hasMore={
                      tab === "Created"
                        ? createdTokens.length < createdTotalDocuments
                        : collectedTokens.length < collectedTotalDocuments
                    }
                    next={
                      tab === "Created"
                        ? fetchCreatdTokens
                        : fetchCollectedTokens
                    }
                    loader={
                      <div
                        className={`w-min ml-auto mr-2 my-3 ${
                          isLoading ? "block" : "hidden"
                        }`}
                      >
                        <div className="rounded-full shadow-3xl bg-white p-3">
                          <Spinner color="text-black" />
                        </div>
                      </div>
                    }
                  >
                    <div className="lg:gap-8 lg:grid-cols-3lg sm:gap-6 sm:grid-cols-2sm grid grid-cols-1fr gap-4 py-5">
                      {((tab === "Created" && createdTokens) || []).map(
                        (token) => {
                          return (
                            <Cards
                              created
                              token={token}
                              key={token._id}
                              bid={token.auction?.bids?.[0]}
                              auction={token.auction}
                            />
                          );
                        }
                      )}
                      {((tab === "Collected" && collectedTokens) || []).map(
                        (token) => {
                          return (
                            <Cards
                              collected
                              token={token}
                              key={token._id}
                              bid={token.auction?.bids?.[0]}
                              auction={token.auction}
                              openAuction={token.openAuction}
                            />
                          );
                        }
                      )}
                    </div>
                  </InfiniteScroll>
                </div>
              ) : (
                <div className="z-30 relative">
                  <div className="flex flex-col items-center pb-24 pt-32 justify-center">
                    <h2 className="md:text-3xl text-2xl tracking-0.01 font-semibold mb-4 text">
                      Your collection is empty.
                    </h2>
                    <div className="mb-8 font-normal max-w-xs font-base leading-relaxed	text-center">
                      Start creating token.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params, res }) {
  try {
    // User
    const { data: user, status } = await UserService.fetchUser(params.username);

    if (!user) {
      res.writeHead(302, { location: "/creators" });
      res.end();
      return {
        props: {
          userData: {},
          createdTokens: [],
          collectedTokens: [],
          error: { message: FETCHING_DATA_ERROR, statusCode: status },
        },
      };
    }

    const page = 1;

    // Fetch creatd Tokens
    const { data: createdTokensData } = await TokenService.fetchCreatdTokens(
      user._id,
      page
    );

    // Fetch collected Tokens
    const { data: collectedTokensData } =
      await TokenService.fetchCollectedTokens(user._id, page);

    return {
      props: {
        error: null,
        userData: user,
        username: params.username,
        createdCurrPage: createdTokensData.currPage,
        createdTokensData: createdTokensData.createdTokens,
        createdTotalDocs: createdTokensData.totalDocuments,
        collectedTokensData: collectedTokensData.collectedTokens,
        collectedCurrPage: collectedTokensData.currPage,
        collectedTotalDocs: collectedTokensData.totalDocuments,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: {
        userData: {},
        username: null,
        createdCurrPage: 0,
        createdTokens: [],
        createdTotalDocs: 0,
        collectedTokens: [],
        collectedCurrPage: 0,
        collectedTotalDocs: 0,
        error: {
          message: FETCHING_DATA_ERROR,
          statusCode: 400,
        },
      },
    };
  }
}

export default Profile;
