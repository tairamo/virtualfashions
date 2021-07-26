import { useState } from "react";
import Link from "next/link";
import nookies from "nookies";
import { Transition } from "@headlessui/react";

import { Loader } from "./ui/Loader";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";
import { useETH } from "../context/ETH";
import WalletButton from "./wallet-button";
import { convertAddress } from "../utils/general";
import { DEFAULT_PROFILE_IMAGE_URL, TOKEN } from "../constants";

export default function Layout({ children }) {
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const { ETHAccount, balance, chainId } = useETH();

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (loading) return LoaderComponent;

  if (!loading && !user) {
    // Redirect to main page
    router.replace("/login");
    return LoaderComponent;
  }

  let profileImage = DEFAULT_PROFILE_IMAGE_URL;
  if (user?.profileUrl) {
    profileImage = user.profileUrl;
  }

  function signOut(event) {
    event.preventDefault();

    event.preventDefault();

    // Destroy token
    nookies.destroy({}, TOKEN);

    // Set user state
    setUser(null);

    // router.push("/");
    router.replace("/login");
  }

  let ETHInfo;
  if (!ETHAccount) {
    ETHInfo = (
      <div className="ml-4 h-2.375 min-h-2.375 max-h-2.375 md:ml-6">
        <WalletButton />
      </div>
    );
  } else if (ETHAccount && balance) {
    ETHInfo = (
      <div className="flex flex-col items-end text-right ml-4 bg-black text-white border-2 border-brand-000000b8 rounded-full px-2.5 py-1">
        <div className="mb-0.5 text-base leading-none font-semibold">
          {chainId !== "" && chainId !== process.env.NEXT_PUBLIC_CHAIN_ID
            ? "Wrong network"
            : `${balance} ETH`}
        </div>
        <div className="text-xs leading-none font-normal font-Formular-Mono">
          {convertAddress(ETHAccount)}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* <!-- Static sidebar for desktop --> */}
      <div className="hidden bg-gray-700 md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                alt="virtual fashion"
                className="h-8 w-auto"
                src="/placeholders/vfs.png"
              />
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {/* <!-- Current: "bg-brand-000000b8 text-white", Default: "text-gray-100 hover:bg-brand-000000a1" --> */}

                <Link href="/" passHref>
                  <a
                    className={` ${
                      router.pathname === "/"
                        ? "bg-brand-000000b8 text-white"
                        : "text-gray-300 hover:bg-brand-000000a1"
                    }  group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {/* <!-- Heroicon name: outline/dashboard --> */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-300"
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
                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                      />
                    </svg>
                    Dashboard
                  </a>
                </Link>

                <Link href="/arts" passHref>
                  <a
                    className={` ${
                      router.pathname === "/arts"
                        ? "bg-brand-000000b8 text-white"
                        : "text-gray-300 hover:bg-brand-000000a1"
                    }  group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {/* <!-- Heroicon name: outline/arts --> */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-300"
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
                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                      />
                    </svg>
                    Arts
                  </a>
                </Link>

                <Link href="/users" passHref>
                  <a
                    className={` ${
                      router.pathname === "/users"
                        ? "bg-brand-000000b8 text-white"
                        : "text-gray-300 hover:bg-brand-000000a1"
                    }  group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {/* <!-- Heroicon name: outline/users --> */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-300"
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
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Users
                  </a>
                </Link>

                {/* <Link href="/fuckups" passHref>
                  <a
                    className={` ${
                      router.pathname === "/fuckups"
                        ? "bg-brand-000000b8 text-white"
                        : "text-gray-300 hover:bg-brand-000000a1"
                    }  group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    Heroicon name: outline/folder
                    <svg
                      className="mr-3 h-6 w-6 text-gray-300"
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
                        d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
                      />
                    </svg>
                    Fuckups
                  </a>
                </Link> */}

                {/* <Link href="/reports" passHref>
                  <a
                    className={` ${
                      router.pathname === "/reports"
                        ? "bg-brand-000000b8 text-white"
                        : "text-gray-300 hover:bg-brand-000000a1"
                    }  group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    Heroicon name: outline/chart-bar
                    <svg
                      className="mr-3 h-6 w-6 text-gray-300"
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    Reports
                  </a>
                </Link> */}

                <Link href="/leads" passHref>
                  <a
                    className={` ${
                      router.pathname === "/leads"
                        ? "bg-brand-000000b8 text-white"
                        : "text-gray-300 hover:bg-brand-000000a1"
                    }  group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {/* <!-- Heroicon name: outline/chart-bar --> */}
                    <svg
                      className="mr-3 h-6 w-6 text-gray-300"
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
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                      />
                    </svg>
                    Leads
                  </a>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              {/* <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search_field"
                    className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                    autoComplete="off"
                  />
                </div>
              </form> */}
            </div>

            {user && ETHInfo}

            <div className="ml-4 flex items-center md:ml-6">
              {/* <!-- Profile dropdown --> */}
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="max-w-xs bg-gray-500 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    id="user-menu"
                    onClick={(event) => setIsOpenProfile(!isOpenProfile)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div
                      className="h-8 w-8 bg-gray-200 bg-cover bg-center rounded-full"
                      style={{ backgroundImage: `url(${profileImage})` }}
                    ></div>
                  </button>
                </div>

                <Transition
                  show={isOpenProfile}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                  >
                    {/* <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Your Profile
                    </a> */}

                    <a
                      href="#"
                      role="menuitem"
                      onClick={signOut}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <main
          className="flex-1 w-full relative overflow-y-auto focus:outline-none"
          tabIndex="0"
        >
          <div className="py-6">
            <div className="max-w-7xl w-full mx-auto p-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
