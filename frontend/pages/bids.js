import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../utils/auth";
import Layout from "../components/layout";
import { SHOW_AUCTIONS } from "../constants";
import BidCard from "../components/Cards/bid";
import { Loader } from "../components/ui/Loader";
import BidService from "../services/api/BidService";
import { Button } from "../components/ui/Button/Button";
import { Spinner } from "../components/ui/Spinner/Spinner";

function Bids() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // State
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  const getBids = async () => {
    try {
      const { data } = await BidService.fetchBids();

      // Set bids state
      setBids(data);

      // Set isLoading state
      setIsLoading(false);
    } catch (err) {
      console.log(err);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      // Fetch bids
      getBids();
    }
  }, [loading]);

  if (!loading && !user) {
    router.push("/login");
    return LoaderComponent;
  }

  if (isLoading) {
    return (
      <Layout>
        {/* Spinner */}
        <div className="min-h-22.5 justify-center items-center flex">
          <Spinner color="text-black" />
        </div>
        {/* Spinner */}
      </Layout>
    );
  }

  return (
    <Layout>
      {bids.length > 0 ? (
        <div className="w-10/12 my-8 mx-auto items-center grid gap-10 grid-cols-1fr">
          <div className="w-full grid gap-4 grid-cols-1ft">
            {(bids || []).map((bid) => (
              <BidCard key={bid._id} bid={bid} />
            ))}
          </div>
        </div>
      ) : (
        <div className="sm:pt-12 md:pt-24 mx-auto w-full px-6 pb-24 flex flex-1 items-center justify-center">
          <div className="mx-auto w-full">
            <div className="mx-auto text-center max-w-30.625">
              <h2 className="md:text-4xl mb-4 text-2xl tracking-0.01 font-semibold">
                Your bids will be shown here
              </h2>
              <div className="mb-8 mx-auto font-base font-normal leading-1.7 max-w-18.75">
                When you place a bid on a token, it will show up here.
              </div>
              <Button
                text={SHOW_AUCTIONS}
                onClick={() => router.push("/")}
                className="sm:px-6 md:py-4 md:px-8 py-2 px-4 rounded-full appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 leading-1.2 focus:outline-none text-black bg-transparent border-black transition-all duration-300 ease-trans-expo hover:shadow-btn transform-2px hover:bg-black hover:text-white"
              />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Bids;
