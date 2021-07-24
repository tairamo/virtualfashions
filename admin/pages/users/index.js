import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/auth";
import Layout from "../../components/layout";
import { Loader } from "../../components/ui/Loader";
import UserListCard from "../../components/userListCard";
import UserService from "../../services/api/UserService";
import Pagination from "../../components/Pagination/Pagination";
import { NO_DATA_AVAILABLE, USERS_FETCHING_ERROR } from "../../constants";

function Users(props) {
  const { user, loading } = useAuth();

  const [users, setUsers] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async (page) => {
    try {
      // Set is loading state
      setIsLoading(true);

      const { data } = await UserService.fetchUsers(page);

      // Set users state
      setUsers(data.users);

      // Set total documents
      setTotalDocs(data.totalDocuments);
    } catch (err) {
      console.log(err);

      // Show error
      toast.error(USERS_FETCHING_ERROR);
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
    // Call fetch users function
    fetchUsers(currentPage);
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
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-24"
                    >
                      Name
                    </th>
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Status
                    </th> */}
                    {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Role
                    </th> */}
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(users || []).map((user) => {
                    return <UserListCard key={user._id} user={user} />;
                  })}

                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan="2"
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

export default Users;
