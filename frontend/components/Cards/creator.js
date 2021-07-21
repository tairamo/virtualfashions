import Link from "next/link";

import config from "../../config";

export default function CreatorCard({ creator }) {
  let bannerImage = config.bannerUrl;
  let profileImage = config.profileUrl;

  if (creator.bannerUrl) {
    bannerImage = creator.bannerUrl;
  }

  if (creator.profileUrl) {
    profileImage = creator.profileUrl;
  }

  return (
    <div className="box-border bg-white min-w-0 transition-all duration-300 ease-trans-expo flex flex-col shadow-3xl rounded-xl overflow-hidden flex-1 hover:shadow-ho3xl transform-4px">
      <Link href={`/${creator.username}`}>
        <div className="cursor-pointer">
          <div className="relative">
            <div className="relative overflow-hidden">
              <div className="pb-57.14 w-full h-0"></div>
              <div className="absolute inset-0 bg-gray-100 flex">
                <img
                  src={bannerImage}
                  alt="creator-banner"
                  className="max-w-full h-auto block min-h-full min-w-full object-cover"
                />
              </div>
            </div>
            <div className="relative mx-6">
              <div className="p-2 bg-white h-24 w-24 absolute left-0 transform -translate-y-2/4	flex rounded-full">
                <div
                  className="max-h-20	max-w-20 min-w-5 min-h-5 h-20 w-20 bg-gray-200 rounded-full bg-center	bg-cover bg-no-repeat"
                  style={{ backgroundImage: `url(${profileImage})` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="px-6 pt-16 pb-12">
            <div className="grid gap-1.5 mb-4">
              <div className="text-black font-semibold text-2 tracking-tight">
                {creator?.fullname}
              </div>
              <div className="flex text-2xl	font-semibold">
                <div className="text-1.375 leading-tight tracking-0.01 text-brand">
                  @{creator?.username}
                </div>
              </div>
            </div>
            <div className="font-base leading-relaxed	font-normal">
              {creator?.bio}
            </div>
          </div>
        </div>
      </Link>

      {/* Follow Unfollow div */}
      {/* <div className="mt-auto flex p-6 border-t	border-gray-200	w-full justify-between items-center">
        <div className="cursor-pointer">
          <div className="font-semibold text-black text-2xl transition-all ease-trans-expo">
            5103
          </div>
          <div className="font-semibold text-lg transition-all ease-trans-expo text-gray-500 ">
            Followers
          </div>
        </div>
        <div className="flex">
          <button className="sm:px-4 md:p-4 inline-block text-center font-semibold px-4 py-2 transition-all ease-trans-expo text-black bg-white leading-tight	h-14 rounded-full text-lg w-8.125 outline-none border-2 border-black hover:border-black hover:shadow-btn hover:bg-black hover:text-white transform-2px">
            Follow
          </button>
          <button className="sm:px-4 md:p-4 inline-block text-center font-semibold px-4 py-2 transition-all ease-trans-expo text-white bg-black leading-tight	h-14 rounded-full text-lg w-8.125 outline-none border-2 border-black hover:border-black hover:shadow-btn hover:bg-black hover:text-white transform-2px">
            Following
          </button>
        </div>
      </div> */}
    </div>
  );
}
