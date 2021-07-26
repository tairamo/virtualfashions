import Link from "next/link";
import moment from "moment";
import { useState } from "react";

import { Video } from "../widgets/video";
import { Image } from "../widgets/image";
import { Spinner } from "../ui/Spinner/Spinner";
import { APPROVED, DATE_FORMAT } from "../../constants";

export default function TokenCard({ token }) {
  const { auction } = token;

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  let bidPrice = null;
  if (auction?.bids?.length > 0) {
    bidPrice = auction.bids[0].bidETH;
  }

  let file = (
    <Image
      alt={token?.title}
      url={token?.url}
      className="rounded-lg object-cover h-20 w-20"
    />
  );

  if (token?.contentType?.includes("video")) {
    file = (
      <div className="flex justify-center w-full">
        <div className="flex relative">
          <Video
            url={token?.url}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`rounded-lg object-cover h-20 w-20 ${
              !isVideoLoaded && "filter blur drop-shadow-02020"
            }`}
          />

          {!isVideoLoaded && (
            <div className="opacity-100">
              <div className="absolute transform -translate-y-1/2 -translate-x-1/2 left-2/4 top-2/4">
                <Spinner color="text-black" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <tr>
      <td className="px-6 py-4 w-20">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-20 w-20">{file}</div>
        </div>
      </td>
      <td className="px-6 py-4  text-sm font-medium text-gray-900 text-center">
        {token?.title ? token?.title : ""}
      </td>
      <td className="px-6 py-4  text-sm font-medium text-gray-900 text-center">
        {bidPrice ? `${bidPrice} ETH` : ""}
      </td>
      <td className="px-6 py-4  text-sm font-medium text-gray-900 text-center">
        {auction?.biddingEndDate
          ? moment(new Date(auction?.biddingEndDate)).format(DATE_FORMAT)
          : ""}
      </td>
      <td className="px-6 py-4 items-center text-center">
        <span
          className={`${
            token?.status === APPROVED
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          } px-2 pt-px pb-3px inline-flex text-xs leading-5 font-semibold rounded-full text-center`}
        >
          {token?.status}
        </span>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-center">
        <Link href={`${token?.ownedBy?.username}/${token?._id}`} passHref>
          <a className="px-2 infline-flex leadingf-5 text-indigo-600 hover:text-indigo-900">
            View
          </a>
        </Link>
      </td>
    </tr>
  );
}
