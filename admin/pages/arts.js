import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { useAuth } from "../context/auth";
import Layout from "../components/layout";
import { Loader } from "../components/ui/Loader";
import TokenCard from "../components/Cards/token";
import { ErrorMsg } from "../components/alerts/error";
import TokenService from "../services/api/TokenService";
import Pagination from "../components/Pagination/Pagination";
import { ART_FETCHING_ERROR, NO_DATA_AVAILABLE } from "../constants";

function Tokens(props) {
  const { user, loading } = useAuth();

  const [tokens, setTokens] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTokens = async (page) => {
    try {
      // Set is loading state
      setIsLoading(true);

      const { data } = await TokenService.fetchTokens(page);

      // Set tokens state
      setTokens(data.tokens);

      // Set total documents
      setTotalDocs(data.totalDocuments);
    } catch (err) {
      console.log(err);

      // Show error message
      toast.error(<ErrorMsg msg={ART_FETCHING_ERROR} />);
    } finally {
      // Set is loading state
      setIsLoading(false);
    }
  };

  const onChangePage = (page) => {
    // Set current page state
    setCurrentPage(page);
  };

  useEffect(() => {
    // Call fetch tokens function
    fetchTokens(currentPage);
  }, [currentPage]);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (loading || isLoading) return LoaderComponent;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto pb-4 sm:pb-6 md:pb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Arts</h1>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Token
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-10"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Bidding
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Date Ending
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Approved
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    ></th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {(tokens || []).map((token) => {
                    return <TokenCard key={token._id} token={token} />;
                  })}

                  {tokens.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-sm py-4 text-center text-gray-900 font-medium"
                      >
                        {NO_DATA_AVAILABLE}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination
                totalDocs={totalDocs}
                currentPage={currentPage}
                onChangePage={onChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Tokens;
