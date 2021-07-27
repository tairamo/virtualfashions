import { useState } from "react";
import ErrorPage from "next/error";
import InfiniteScroll from "react-infinite-scroll-component";

import Layout from "../components/layout";
import CreatorCard from "../components/Cards/creator";
import UserService from "../services/api/UserService";
import { CREATORS_FETCHING_ERROR } from "../constants";
import { Spinner } from "../components/ui/Spinner/Spinner";

function Creators({ creatorsData, currPage, totalDocuments, error }) {
  // State
  const [err, setErr] = useState(error);
  const [isLoading, setIsLoading] = useState(true);
  const [creators, setCreators] = useState(creatorsData || []);
  const [currentPage, setCurrentPage] = useState(currPage || 0);
  const [totalDocs, setTotalDocs] = useState(totalDocuments || 0);

  // Fetch creators
  const fetchCreators = async () => {
    try {
      // Set is loading state
      setIsLoading(true);

      const page = currentPage + 1;

      // fetch creators
      const { data } = await UserService.fetchCreators(page);

      // Set creators state
      setCreators(data.creators);

      // Set total docs state
      setTotalDocs(data.totalDocuments);

      // Set current page state
      setCurrentPage(data.currPage);

      // Set is loading state
      setIsLoading(false);
    } catch (err) {
      console.log(err);

      // Set error
      setErr({ message: CREATORS_FETCHING_ERROR, statusCode: 400 });

      // Set is loading state
      setIsLoading(false);
    }
  };

  if (err?.message && err?.statusCode) {
    return <ErrorPage statusCode={err?.statusCode} title={err?.message} />;
  }

  return (
    <Layout>
      {creators?.length > 0 ? (
        <InfiniteScroll
          dataLength={creators.length}
          next={fetchCreators}
          hasMore={creators.length < totalDocs}
          loader={
            <div
              className={`w-min ml-auto mr-2 my-3 ${
                isLoading ? "block" : "hidden"
              }`}
            >
              <div className="rounded-full shadow-3xl bg-white p-3">
                <Spinner color="text-blck" />
              </div>
            </div>
          }
        >
          <div className="md:py-16 py-8 flex mx-auto w-full px-6 relative z-10 flex-shrink-0	flex-grow	flex-col">
            <div className="min-w-0 sm:gap-6 sm:grid-cols-2sm md:gap-8 md:grid-cols-3lg lg:grid-cols-4lg grid gap-1 grid-cols-1sm">
              {creators.map((user) => (
                <CreatorCard creator={user} key={user._id} />
              ))}
            </div>
          </div>
        </InfiniteScroll>
      ) : (
        <div className="sm:pt-12 md:pt-24 pt-10 min-h-calc265px mx-auto w-full px-6 pb-24 flex flex-1 items-center justify-center">
          <div className="mx-auto w-full">
            <div className="mx-auto text-center max-w-30.625">
              <h2 className="md:text-4xl mb-4 text-2xl tracking-0.01 font-semibold">
                No creators found
              </h2>
              <div className="mb-8 mx-auto font-base font-normal leading-1.7 max-w-18.75">
                Become the first one by creating token.
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const page = 1;

    const { data } = await UserService.fetchCreators(page);

    return {
      props: {
        error: null,
        currPage: data.currPage,
        creatorsData: data.creators,
        totalDocuments: data.totalDocuments,
      },
    };
  } catch (err) {
    return {
      props: {
        currPage: 0,
        creatorsData: [],
        totalDocuments: 0,
        error: {
          message: CREATORS_FETCHING_ERROR,
          statusCode: 400,
        },
      },
    };
  }
}

export default Creators;
