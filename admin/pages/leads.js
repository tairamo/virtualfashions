import { useState, useEffect } from "react";

import { useAuth } from "../context/auth";
import Layout from "../components/layout";
import LeadCard from "../components/leadCard";
import { NO_DATA_AVAILABLE } from "../constants";
import { Loader } from "../components/ui/Loader";
import LeadService from "../services/api/LeadService";
import Pagination from "../components/Pagination/Pagination";

function Leads(props) {
  const { user, loading } = useAuth();

  const [leads, setLeads] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage = (page) => {
    // Set current page state
    setCurrentPage(page);
  };

  const fetchLeads = async (page) => {
    try {
      // Set loading state
      setIsLoading(true);

      const { data } = await LeadService.fetchLeads(page);

      // Set leads state
      setLeads(data.leads);

      // Set totalDocs state
      setTotalDocs(data.totalDocuments);
    } catch (err) {
      console.log(err);
    } finally {
      // Set loading state
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Call fetch leads function
    fetchLeads(currentPage);
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
        <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Select
                      </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(leads || []).map((lead) => {
                    return <LeadCard key={lead.uid} lead={lead} />;
                  })}

                  {leads.length === 0 && (
                    <tr>
                      <td
                        colSpan="1"
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

export default Leads;
