import { ToastContainer } from "react-toastify";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import { AuthProvider } from "../utils/auth";
import { ETHProvider } from "../context/ETH";
import { ModalProvider } from "../context/Modal";
import { Modals } from "../components/modals";

const contextClass = {
  success: "bg-black text-white",
  error: "bg-black text-white",
  info: "bg-black text-white",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 text-gray-300",
};

function Nifty({ Component, pageProps }) {
  return (
    <ModalProvider>
      <AuthProvider>
        <ETHProvider>
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
          <Modals />
        </ETHProvider>
      </AuthProvider>
    </ModalProvider>
  );
}

export default Nifty;
