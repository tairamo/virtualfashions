import { SearchResult } from "./result";
import { Spinner } from "../ui/Spinner/Spinner";
import { getProfileUrl } from "../../utils/general";
import { ReactComponent as SearchIcon } from "../../public/icons/input-search.svg";

export const SearchBox = ({ users, tokens, isLoading }) => {
  return (
    <div className="w-full absolute left-0 top-4 z-50">
      <div className="md:shadow-0.15 bg-white rounded-md p-5 g-3 shadow-0.1 grid">
        {(!users && !tokens && !isLoading) ||
        (users?.length === 0 && tokens?.length === 0) ? (
          <div className="items-center flex flex-col py-24 gap-4">
            <div className="grid gap-8 justify-center">
              <div className="grid gap-4">
                <div className="grid gap-8 justify-center">
                  <SearchIcon className="text-black h-6 w-6 fill-current mx-auto block" />
                  <h1 className="font-bold tracking-0.01 text-2 leading-1.1">
                    No search results
                  </h1>
                </div>
                <div className="max-w-22.5 mx-auto leading-relaxed text-center text-gray-500">
                  Results not found
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="block">
              {users?.length > 0 && (
                <div className="gap-2 grid">
                  <div className="font-bold text-base text-gray-500 leading-1.2">
                    Creators
                  </div>
                  {users.map((user) => (
                    <SearchResult
                      key={user._id}
                      name={user.fullname}
                      username={user.username}
                      url={`/${user.username}`}
                      imageUrl={getProfileUrl(user)}
                    />
                  ))}
                </div>
              )}

              {tokens?.length > 0 && (
                <div className="gap-2 grid">
                  <div className="font-bold text-base text-gray-500 leading-1.2">
                    Tokens
                  </div>
                  {tokens.map((token) => (
                    <SearchResult
                      token
                      key={token._id}
                      name={token.title}
                      imageUrl={token.thumbnailUrl}
                      username={token.user.username}
                      contentType={token.thumbnailContentType}
                      url={`/${token.user.username}/${token._id}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div
              className={`min-h-22.5 justify-center items-center ${
                isLoading ? "flex" : "hidden"
              }`}
            >
              <Spinner color="text-black" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
