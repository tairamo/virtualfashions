import { useRouter } from "next/router";

import NavBar from "./navBar";
import Footer from "./footer";
import { Loader } from "./ui/Loader";
import { useAuth } from "../utils/auth";

export default function layout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const LoaderComponent = (
    <div className="mt-20">
      <Loader />
    </div>
  );

  if (loading) {
    return LoaderComponent;
  } else if (!loading && !user) {
    // router.replace("/login");
    // return LoaderComponent;
  }

  let classes = "w-full";
  if (
    router.pathname === "/profile/add-details" ||
    router.pathname === "/profile/create/create"
  ) {
    classes = "w-full mx-auto px-6";
  } else if (router.pathname === "/") {
    classes = "mx-auto px-4 sm:px-6 lg:px-8";
  } else if (router.pathname === "/[username]/[niftyId]/bid") {
    classes = "bg-brand-f2f2f2 mx-auto md:py-10 py-6 px-4 sm:px-6 lg:px-8";
  } else if (
    router.pathname !== "/[username]" &&
    router.pathname !== "/creators" &&
    router.pathname !== "/[username]/[niftyId]" &&
    router.pathname !== "/bids"
  ) {
    classes = "container mx-auto px-4 sm:px-6 lg:px-8";
  }

  return (
    <div className="">
      {/* Navigation bar */}
      <NavBar />

      {/* Content */}
      <div className={classes}>{children}</div>

      {/* Footer */}
      {router.pathname !== "/[username]/[niftyId]/bid" && <Footer />}
    </div>
  );
}
