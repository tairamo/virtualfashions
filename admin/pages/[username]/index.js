import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/auth";
import Layout from "../../components/layout";
import { Loader } from "../../components/ui/Loader";
import UserService from "../../services/api/UserService";
import TokenService from "../../services/api/TokenService";
import {
  USER_FETCHING_ERROR,
  DEFAULT_BANNER_IMAGE_URL,
  DEFAULT_PROFILE_IMAGE_URL,
} from "../../constants";

function UserDetail() {
  const { loading, user } = useAuth();
  const router = useRouter();
  const { username } = router.query;

  const [isLoading, setIsLoading] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [createdTokensCount, setCreatedTokensCount] = useState([]);
  const [collectedTokensCount, setCollectedTokensCount] = useState([]);

  const fetchUser = async (name) => {
    try {
      // Set is loading state
      setIsLoading(true);

      const { data } = await UserService.fetchUser(name);

      if (!data) {
        // Show error
        toast.error("User not found!");

        // Redirect to users page
        await router.push("/users");
      }

      // Call fetch tokens function
      await fetchTokens(data._id);

      // Set user state
      setUserDetail(data);
    } catch (err) {
      console.log(err);

      // Show error
      toast.error(USER_FETCHING_ERROR);
    } finally {
      // Set is loading state
      setIsLoading(false);
    }
  };

  const fetchTokens = async (userId) => {
    try {
      const page = 1;
      const { data: createdTokens } = await TokenService.fetchCreatdTokens(
        userId,
        page
      );
      const { data: collectedTokens } = await TokenService.fetchCollectedTokens(
        userId,
        page
      );

      // Set created tokens count state
      setCreatedTokensCount(createdTokens.totalDocuments);

      // Set collected tokens count state
      setCollectedTokensCount(collectedTokens.totalDocuments);
    } catch (err) {
      console.log(err);

      // Show error
      toast.error(USER_FETCHING_ERROR);
    }
  };

  useEffect(() => {
    // Call fetch user function
    fetchUser(username);
  }, [username]);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (!user || loading || isLoading) return LoaderComponent;

  let bannerUrl = DEFAULT_BANNER_IMAGE_URL;
  if (userDetail?.bannerUrl) {
    bannerUrl = userDetail.bannerUrl;
  }

  let profileUrl = DEFAULT_PROFILE_IMAGE_URL;
  if (userDetail?.profileUrl) {
    profileUrl = userDetail.profileUrl;
  }

  return (
    <Layout>
      <main>
        <div>
          <img
            className="h-48 w-full object-cover lg:h-72"
            src={bannerUrl}
            alt="Banner"
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 ">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={profileUrl}
                alt="Profile"
              />
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="md:block mt-6 min-w-0 flex-1">
                <p className="text-black font-bold text-2xl truncate mt-6 mb-1">
                  {userDetail?.fullname}{" "}
                </p>
                <h1 className="text-2xl font-bold text-gray-500 truncate">
                  @{userDetail?.username}
                </h1>
              </div>
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-end sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="md:block mt-6 min-w-0 flex-1 pt-4">
                <div className="flex flex-row-reverse">
                  <div className="pl-2">
                    {userDetail?.socials?.instagram && (
                      <a href={userDetail?.socials?.instagram}>
                        <Image
                          width={24}
                          height={24}
                          src="/icons/instagram.png"
                        />
                      </a>
                    )}
                  </div>
                  <div className="px-2">
                    {userDetail?.socials?.twitter && (
                      <a href={userDetail?.socials?.twitter}>
                        <Image
                          width={24}
                          height={24}
                          src="/icons/twitter.png"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 mr-6 text-base font-thin text-gray-700">
            <p>{userDetail?.bio}</p>
          </div>
          <div className="grid gap-1 grid-cols-1 items-center justify-center mt-8">
            <div className="text-gray-700 text-base">
              Created arts:{" "}
              <span className="font-semibold text-lg">
                {createdTokensCount}
              </span>
            </div>
            <div className="text-gray-700 text-base">
              Collected arts:{" "}
              <span className="font-semibold text-lg">
                {collectedTokensCount}
              </span>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default UserDetail;
