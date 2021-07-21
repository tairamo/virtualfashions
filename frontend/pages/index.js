import { useState } from "react";
import ErrorPage from "next/error";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAuth } from "../utils/auth";
import Layout from "../components/layout";
import { Nifty } from "../components/nifty";
import Card from "../components/Cards/card";
import { FETCHING_DATA_ERROR } from "../constants";
import CtaRegister from "../components/CTA/ctaRegister";
import { Spinner } from "../components/ui/Spinner/Spinner";
import AuctionService from "../services/api/AuctionService";

function Home({ auctionsData, totalDocuments, currPage, error }) {
  const { user } = useAuth();

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
      setErr({ message: FETCHING_DATA_ERROR, statusCode: 400 });

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
        <Nifty auction={auctions[randomNum]} key={auctions[randomNum]._id} />
      )}

      {user ? "" : <CtaRegister />}

      <div className="">
        <div className="mb-6 border-b border-gray-300">
          <div className="sm:16 sm:text-2xl md:pt-24 flex pt-12 pb-6 justify-between items-baseline leading-none tracking-tight font-semibold ">
            Live auctions
          </div>
        </div>
        {auctions.length === 0 && (
          <div className="flex flex-col items-center pb-24 pt-32 justify-center">
            <h2 className="md:text-3xl text-2xl tracking-0.01 font-semibold mb-4 text">
              No Auctions available
            </h2>
            <div className="mb-8 font-normal max-w-xs font-base leading-relaxed	text-center">
              Start creating nifty.
            </div>
          </div>
        )}
        <InfiniteScroll
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
                nifty={auction.nifty}
                bid={auction.bids?.[0]}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    // Niftys
    const page = 1;
    const { data } = await AuctionService.fetchAuctions(page);

    return {
      props: {
        error: null,
        auctionsData: data.auctions,
        currPage: parseInt(data.currPage),
        totalDocuments: data.totalDocuments,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      props: {
        currPage: 0,
        auctionsData: [],
        totalDocuments: 0,
        error: {
          message: FETCHING_DATA_ERROR,
          statusCode: 400,
        },
      },
    };
  }
}

export default Home;
