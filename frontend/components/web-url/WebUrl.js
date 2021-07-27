import { ReactComponent as HubIcon } from "../../public/icons/hub.svg";
import { ReactComponent as UrlIcon } from "../../public/icons/globe.svg";
import { ReactComponent as TwitterIcon } from "../../public/icons/twitter.svg";
import { ReactComponent as OnlyfansIcon } from "../../public/icons/onlyfans.svg";
import { ReactComponent as InstagramlIcon } from "../../public/icons/instagram.svg";

export default function WebUrl({ url, type }) {
  return (
    <div className="transition-all duration-300 ease-trans-expo transform-2px w-max">
      <a
        href={url}
        target="_blank"
        className="outline-none flex text-gray-500 no-underline items-center active:outline-none focus:outline-none hover:text-black"
      >
        <div className="mr-4">
          {type === "website" && (
            <UrlIcon className="fill-current" width="20" height="20" />
          )}

          {type === "instagram" && (
            <InstagramlIcon className="fill-current" width="20" height="20" />
          )}

          {type === "twitter" && (
            <TwitterIcon className="fill-current" width="20" height="20" />
          )}

          {type === "pornhub" && (
            <HubIcon className="fill-current" width="20" height="20" />
          )}

          {type === "only-fans" && (
            <OnlyfansIcon className="fill-current" width="20" height="20" />
          )}
        </div>
        <div className="text-sm">{url}</div>
      </a>
    </div>
  );
}
