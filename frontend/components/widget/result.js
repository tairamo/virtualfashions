import Link from "next/link";

export const SearchResult = ({ url, imageUrl, name, username, token }) => {
  return (
    <Link href={url}>
      <div className="lg:px-6 lg:py-5 p-3 items-center transition-all duration-100 ease-trans-expo rounded-lg flex hover:bg-brand-f2f2f2 cursor-pointer">
        <div className="flex w-8 h-8 lg:w-16 lg:h-16 lg:mr-6 flex-shrink-0 flex-grow-0 mr-3 bg-cover bg-center items-center justify-center rounded-md">
          <div
            style={{ backgroundImage: `url(${imageUrl})` }}
            className={`m-0 min-w-2rem max-w-2rem min-h-2rem max-h-2rem lg:min-h-3.125 lg:min-w-3.125 lg:max-h-3.125 lg:max-w-3.125 bg-gray-200 bg-cover bg-center ${
              token ? "rounded-0.625" : "rounded-full"
            }`}
          ></div>
        </div>
        <div className="items-center gap-1 grid ">
          <h1 className="text-lg lg:text-2xl font-bold flex text-black leading-1.1 tracking-tight">
            {name}
          </h1>
          <h1 className="font-bold flex text-black leading-1.1 tracking-tight">
            <div className="text-brand">@{username}</div>
          </h1>
        </div>
      </div>
    </Link>
  );
};
