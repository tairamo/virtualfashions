import { ToastContainer } from "react-toastify";

import config from "../config";
import Fuego from "../utils/fuego";
import { AuthProvider } from "../context/auth";
import { ETHProvider } from "../context/ETH";
import { FuegoProvider } from "@nandorojo/swr-firestore";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

const fuego = new Fuego(config.fb);

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ETHProvider>
        <FuegoProvider fuego={fuego}>
          <Component {...pageProps} />
          <ToastContainer
            toastClassName={({ type }) =>
              contextClass[type || "default"] +
              " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
            }
            bodyClassName={() => "text-sm font-white font-med block p-3"}
            position="bottom-center"
            autoClose={3000}
          />
        </FuegoProvider>
      </ETHProvider>
    </AuthProvider>
  );
}

export default MyApp;
