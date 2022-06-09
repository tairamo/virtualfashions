import { useState } from "react";
import ErrorPage from "next/error";

import { useAuth } from "../utils/auth";
import Layout from "../components/layout";
import { Token } from "../components/token";
import { AUCTIONS_FETCHING_ERROR } from "../constants";
import CtaRegister from "../components/CTA/ctaRegister";
import AuctionService from "../services/api/AuctionService";
import axios from "axios";
import { Image } from "../components/widget/image";

function Home({ auctionsData, totalDocuments, currPage, error, nfts }) {
  const { user } = useAuth();

  const assetsToRender =
    nfts?.reduce((prev, curr) => {
      return [...prev, ...curr.assets];
    }, []) ?? [];

  // State
  const [err, setErr] = useState(error);
  const [isLoading, setIsLoading] = useState(false);
  const [auctions, setAuctions] = useState(auctionsData || []);
  const [currentPage, setCurrentPage] = useState(currPage || 0);
  const [totalDocs, setTotalDocs] = useState(totalDocuments || 0);

  const randomNum = Math.round(Math.random() * (auctions?.length - 1));

  // Fetch auctions
  const fetchAuctions = async () => {
    try {
      // Set is loading state
      setIsLoading(true);

      const page = currentPage + 1;

      // fetch auctions
      const { data } = await AuctionService.fetchAuctions(page);

      // Set auctions state
      setAuctions(data.auctions);

      // Set total docs state
      setTotalDocs(data.totalDocuments);

      // Set current page state
      setCurrentPage(data.currPage);

      // Set is loading state
      setIsLoading(false);
    } catch (err) {
      console.log(err);

      // Set error
      setErr({ message: AUCTIONS_FETCHING_ERROR, statusCode: 400 });

      // Set is loading state
      setIsLoading(false);
    }
  };

  if (err?.message && err?.statusCode) {
    return <ErrorPage statusCode={err?.statusCode} title={err?.message} />;
  }

  return (
    <Layout>
      {auctions[randomNum] && (
        <Token auction={auctions[randomNum]} key={auctions[randomNum]._id} />
      )}

      {user ? "" : <CtaRegister />}

      <div className="">
        <div className="mb-6 border-b border-gray-300">
          <div className="sm:16 sm:text-2xl md:pt-24 flex pt-12 pb-6 justify-between items-baseline leading-none tracking-tight font-semibold ">
            Live auctions
          </div>
        </div>
        {assetsToRender.length === 0 && (
          <div className="flex flex-col items-center pb-24 pt-32 justify-center">
            <h2 className="md:text-3xl text-2xl tracking-0.01 font-semibold mb-4 text">
              No Auctions available
            </h2>
            <div className="mb-8 font-normal max-w-xs font-base leading-relaxed	text-center">
              Start creating token.
            </div>
          </div>
        )}
        <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-3 gap-8 mb-8">
          {!!assetsToRender.length &&
            assetsToRender.map((asset, index) => {
              return (
                <div
                  index={index}
                  onClick={() => window.open(asset.permalink)}
                  className="token-card cursor-pointer box-border m-0 min-w-0 shadow-3xl rounded-xl relative transition-all duration-300 ease-trans-expo overflow-hidden flex flex-col transform-4px hover:shadow-ho3xl"
                >
                  <div className="box-border m-0 min-w-0 relative overflow-hidden">
                    <div className="box-border m-0 min-w-0 w-full h-0 pb-100%"></div>
                    <div className="box-border m-0 min-w-0 flex justify-center items-center bg-gray-200 inset-0 absolute">
                      <Image
                        alt={asset.name}
                        url={asset.image_url}
                        className="box-border m-0 min-w-0 opacity-1 max-w-full h-full w-full object-cover block"
                      />
                    </div>
                  </div>

                  <div className="box-border m-0 min-w-0 grid gap-6 shadow-3xl px-3 py-4 flex-1 bg-white">
                    <div className="box-border m-0 min-w-0 flex justify-between">
                      <div className="box-border m-0 min-w-0 text-xl font-semibold overflow-ellipsis overflow-hidden">
                        <div>{asset.name}</div>
                      </div>
                    </div>
                    <div className="box-border m-0 min-w-0 flex mt-auto">
                      <div className="box-border m-0 min-w-0 flex z-30 relative text-gray-500 transition-all duration-300 ease-trans-expo">
                        <div className="box-border m-0 min-w-0 cursor-pointer">
                          <a className="transition duration-300 ease-trans-expo no-underline text-gray-500 hover:text-black">
                            <div className="box-border m-0 min-w-0 mt-3 flex items-center bg-white no-underline">
                              <div
                                className="box-border m-0 min-w-0 bg-cover bg-center rounded-full border-black border-solid w-9 h-9 min-w-2.25 max-w-2.25 min-h-2.25 max-h-2.25"
                                style={{
                                  backgroundImage: `url(${asset.creator.profile_img_url})`,
                                }}
                              ></div>
                              <div className="box-border m-0 min-w-0 flex">
                                <div className="sm:text-base text-sm ml-2 font-semibold no-underline relative -top-0.5">
                                  {`@${asset.creator.user.username}`}
                                </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* To Be removed */}
        {/* <InfiniteScroll
          dataLength={auctions.length}
          next={fetchAuctions}
          hasMore={auctions.length < totalDocs}
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
          <div className="min-w-0 m-0 my-8 grid gap-4 grid-cols-1sm sm:gap-6 sm:grid-cols-2sm md:gap-8 md:grid-cols-3lg lg:grid-cols-4lg">
            {(auctions || []).map((auction) => (
              <Card
                key={auction._id}
                auction={auction}
                token={auction.token}
                bid={auction.bids?.[0]}
              />
            ))}
          </div>
        </InfiniteScroll> */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const ownerAddress = "0xEa6107836417067dDb234535c372D22EB995A223";
    const openseaAPIUrl = "https://opensea-data-query.p.rapidapi.com/api/v1";
    const collections = await axios.get(`${openseaAPIUrl}/collections`, {
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_OPENSEA_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_OPENSEA_RAPID_API_HOST,
      },
      params: {
        asset_owner: ownerAddress,
        limit: "50",
        offset: "0",
      },
    });

    const createdCollections = collections.data.filter(
      (collection) => !collection.primary_asset_contracts.length
    );

    const pendingPromises = createdCollections.map((collection) =>
      axios.get(`${openseaAPIUrl}/assets`, {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_OPENSEA_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_OPENSEA_RAPID_API_HOST,
        },
        params: {
          collection: collection.slug,
          order_direction: "desc",
          limit: 50,
        },
      })
    );

    const resolvedPromises = await Promise.all(pendingPromises);

    // Tokens
    const page = 1;
    const { data } = await AuctionService.fetchAuctions(page);

    return {
      props: {
        error: null,
        auctionsData: data.auctions,
        currPage: parseInt(data.currPage),
        totalDocuments: data.totalDocuments,
        nfts: resolvedPromises.map((res) => res.data),
      },
    };
  } catch (err) {
    return {
      props: {
        currPage: 0,
        auctionsData: [],
        totalDocuments: 0,
        error: {
          message: AUCTIONS_FETCHING_ERROR,
          statusCode: 400,
        },
      },
    };
  }
}

export default Home;
