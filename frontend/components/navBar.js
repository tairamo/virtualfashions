import { useEffect, useState } from "react";
import Link from "next/link";
import nookies from "nookies";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";

import Icon from "./icon.js";
import { useAuth } from "../utils/auth";
import { useETH } from "../context/ETH";
import WalletButton from "./wallet-button";
import { SearchBox } from "./widget/search";
import { INTERVAL, TOKEN } from "../constants";
import { convertAddress } from "../utils/general";
import NiftyService from "../services/api/NiftyService";
import { DEFAULT_PROFILE_IMAGE_URL, WRONG_NETWORK } from "../constants";
import { ReactComponent as CloseIcon } from "../public/icons/input-close.svg";
import { ReactComponent as SearchIcon } from "../public/icons/input-search.svg";

let timeout;

export default function navBar() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const { ETHAccount, balance, chainId } = useETH();

  /// shows Dropdown menu when profile is clicked #isOpen
  const [isOpen, setIsOpen] = useState(false);

  // Shows the mobile menu if button is clicked on  #showMobileMenu
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  // Search function
  const search = async (value) => {
    if (value?.length === 0) return;

    // Set show search box state
    setShowSearchBox(true);

    // Call api
    const { data } = await NiftyService.searchNiftys(value);

    // Set search result
    setSearchResult(data);

    // Set show search box state
    setIsLoading(false);
  };

  // Search input change handler function
  const inputChangeHandler = (e) => {
    // Set search Value
    setSearchValue(e.target.value);
  };

  // Search input keypress function
  const onKeyPressHandler = (e) => {
    if (e.keyCode !== 13 && e.which !== 13) return;
    e.preventDefault();

    // Clear timeout
    clearTimeout(timeout);

    // Call search function
    search(e.target.value);
  };

  // Sign out function
  const signOut = (event) => {
    event.preventDefault();

    // Destroy token
    nookies.destroy({}, TOKEN);

    // Set user state
    setUser(null);

    // router.push("/");
    router.replace("/login");
  };

  useEffect(() => {
    // Clear timeout
    clearTimeout(timeout);

    if (!searchValue || searchValue?.length === 0) {
      // Set search result state
      setSearchResult(null);
      return;
    }

    // Set loading state
    setIsLoading(true);

    // Set search result state
    setSearchResult(null);

    timeout = setTimeout(() => {
      // Call search function
      search(searchValue);
    }, INTERVAL);
  }, [searchValue]);

  let profileImage = DEFAULT_PROFILE_IMAGE_URL;
  if (user?.profileUrl) {
    profileImage = user.profileUrl;
  }

  let ETHInfo;
  if (!ETHAccount) {
    ETHInfo = (
      <div className="ml-4 h-2.375 min-h-2.375 max-h-2.375">
        <WalletButton />
      </div>
    );
  } else if (ETHAccount) {
    ETHInfo = (
      <div className="md:flex hidden flex-col items-end text-right ml-4 bg-black text-white border-2 border-black rounded-full px-3 py-1">
        <div className="mb-0.5 text-base leading-none font-semibold">
          {chainId !== "" && chainId !== process.env.NEXT_PUBLIC_CHAIN_ID
            ? WRONG_NETWORK
            : `${balance} ETH`}
        </div>
        <div className="text-xs leading-none font-normal font-Formular-Mono">
          {convertAddress(ETHAccount)}
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              <Icon />
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              <Link href="/" passHref>
                <a
                  className={` ${
                    router.pathname === "/"
                      ? "border-black text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  // onClick={() => setThisTab("home")}
                >
                  Market
                </a>
              </Link>
              <Link href="/creators" passHref>
                <a
                  className={` ${
                    router.pathname === "/creators"
                      ? "border-black text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  // onClick={() => setThisTab("creators")}
                >
                  Creators
                </a>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 relative flex-col z-50">
            <div className="w-4/6 lg:w-5/6">
              <div className="w-full max-w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* Heroicon name: solid/search */}
                    <SearchIcon
                      className={`h-5 w-5 fill-current transition-all duration-300 ease-trans-expo ${
                        showSearchBox ? "text-black" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <input
                    type="text"
                    id="search"
                    name="search"
                    autoComplete="off"
                    value={searchValue || ""}
                    placeholder="Search"
                    onChange={inputChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    onClick={() => {
                      // Show search box
                      setShowSearchBox(true);
                    }}
                    className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm transition-all duration-300 ease-trans-expo overflow-hidden ${
                      showSearchBox ? "border-black ring-black ring-2" : ""
                    }`}
                  />
                  {searchValue && (
                    <div
                      onClick={() => setSearchValue(null)}
                      className="absolute right-5 top-2/4 transform -translate-y-2/4 transition-all duration-300 ease-trans-expo cursor-pointer"
                    >
                      <CloseIcon className="h-3 w-3 text-gray-500 hover:text-black" />
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                {showSearchBox && searchValue?.length > 0 && (
                  <SearchBox
                    isLoading={isLoading}
                    users={searchResult?.users}
                    niftys={searchResult?.niftys}
                  />
                )}
              </div>
            </div>
          </div>
          {showSearchBox && (
            <div
              onClick={() => setShowSearchBox(false)}
              className="block opacity-1 pointer-events-auto fixed inset-0 z-40 bg-backdrop transition-all duration-100 ease-trans-expo transform translate-x-0 translate-y-0"
            ></div>
          )}
          <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black focus:border-black"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <span className="sr-only">Open main menu</span>
              {/*                 
                  Icon when menu is closed.
      
                  Heroicon name: outline/menu
      
                  Menu open: "hidden", Menu closed: "block" */}

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              {/* Icon when menu is open.
      
                  Heroicon name: outline/x
      
                  Menu open: "block", Menu closed: "hidden"
                 */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:items-center">
            {user ? (
              <div className="h-full">
                <Link href="/bids" passHref>
                  <a
                    className={`lg:ml-4 ${
                      router.pathname === "/bids"
                        ? "border-black text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full`}
                  >
                    Bids
                  </a>
                </Link>
                <Link href="/profile/create/create" passHref>
                  <a
                    className={`lg:ml-4 ${
                      router.pathname === "/profile/create/create"
                        ? "border-black text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full`}
                  >
                    Create
                  </a>
                </Link>
              </div>
            ) : (
              <Link
                href={{
                  pathname: "/login",
                  // query: { redirect: router.pathname },
                }}
                passHref
              >
                <a className="border-transparent text-gray-500 hover:text-black inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Login
                </a>
              </Link>
            )}

            {user && ETHInfo}

            {/* Profile dropdown #isOpen*/}
            {user && (
              <div className="ml-4 relative flex-shrink-0">
                <div>
                  <button
                    type="button"
                    className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black focus:border-black"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <span className="sr-only">Open user menu</span>

                    {user ? (
                      <div
                        className="min-w-2.25 min-h-2.25 max-w-2.25 max-h-2.25 bg-gray-200 bg-cover bg-center rounded-full"
                        style={{ backgroundImage: `url(${profileImage})` }}
                      ></div>
                    ) : (
                      <>
                        <div className="h-8 w-8">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="grey"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </>
                    )}
                  </button>
                </div>
                <Transition
                  show={isOpen}
                  enter="transition-all ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition-all ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div
                    className="z-40 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link href={`/${user?.username}`} passHref>
                      <a
                        role="menuitem"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </a>
                    </Link>
                    {/* <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Settings
                    </a> */}
                    <a
                      href="#"
                      role="menuitem"
                      onClick={signOut}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {" "}
                      Sign out
                    </a>
                  </div>
                </Transition>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. #showMobileMenu*/}
      <div
        className={` ${showMobileMenu ? "block" : "hidden"} lg:hidden`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          {/* Current: "bg-brand-f2f2f2-50 border-black text-black font-semibold", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
          <Link href="/" passHref>
            <a
              className={` ${
                router.pathname === "/"
                  ? "bg-brand-f2f2f2 border-black text-black font-semibold "
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Market
            </a>
          </Link>
          <Link href="/creators" passHref>
            <a
              className={` ${
                router.pathname === "/creators"
                  ? "bg-brand-f2f2f2 border-black text-black font-semibold "
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              Creators
            </a>
          </Link>

          {user ? (
            <div>
              <Link href="/bids" passHref>
                <a
                  className={` ${
                    router.pathname === "/bids"
                      ? "bg-brand-f2f2f2 border-black text-black font-semibold "
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Bids
                </a>
              </Link>
              <Link href="/profile/create/create" passHref>
                <a
                  className={` ${
                    router.pathname === "/profile/create/create"
                      ? "bg-brand-f2f2f2 border-black text-black font-semibold "
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  Create
                </a>
              </Link>
            </div>
          ) : (
            <Link
              href={{
                pathname: "/login",
                // query: { redirect: router.pathname },
              }}
              passHref
            >
              <a className="border-transparent text-gray-500 hover:text-black block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
                Login
              </a>
            </Link>
          )}

          {user && !ETHAccount && (
            <div className="h-10">
              <WalletButton />
            </div>
          )}
        </div>
        {user && (
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={profileImage}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {user?.username}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.email}
                </div>
              </div>
              <button className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                <span className="sr-only">View notifications</span>
                {/* Heroicon name: outline/bell */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <Link href={`/${user.username}`} passHref>
                <a
                  role="menuitem"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </a>
              </Link>
              {/* <a
                href="#"
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Settings
              </a> */}
              <a
                href="#"
                onClick={signOut}
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
