import Link from "next/link";

export const UserWidget = ({ user, image }) => {
  return (
    <div className="flex">
      <Link href={`/${user?.username}`}>
        <div className="sm:p-2.5 sm:pr-5 bg-white flex items-center p-2 shadow-3xl rounded-full transitioin duration-300 ease-trans-expo transform-2px hover:shadow-ho3xl pr-5 cursor-pointer">
          <div
            className="sm:min-w-2.25 sm:min-h-2.25 sm:max-w-2.25 sm:max-h-2.25 w-6 h-6 bg-gray-200 bg-cover bg-center rounded-full"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
          <div className="flex sm:text-base font-semibold relative -top-0.5 text-sm ml-2">
            @{user?.username || ""}
          </div>
        </div>
      </Link>
    </div>
  );
};
