import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";

const initialPage = 1;
const defaultPageSize = 10;
export default function Pagination({ totalDocs, onChangePage, currentPage }) {
  const [pager, setPager] = useState({});

  const setPage = (page) => {
    let pager = pager;

    if (page < 1 || page > pager?.totalPages) {
      return;
    }

    // get new pager object for specified page
    pager = getPager(totalDocs, page);

    // update state
    setPager(pager);

    // call change page function in parent component
    onChangePage(pager.currentPage);
  };

  const getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || defaultPageSize;

    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 4) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 4) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages,
    };
  };

  useEffect(() => {
    if (!totalDocs || totalDocs <= 0) return;

    // Set pager state
    setPage(currentPage);
  }, []);

  console.log(pager);

  if (!pager.pages || pager.pages.length <= 1) {
    // don't display pager if there is only 1 page
    return null;
  }

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          disabled={pager.currentPage === 1}
          onClick={() => setPage(pager.currentPage - 1)}
          className={`outline-none relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
            pager.currentPage === 1 ? "cursor-default" : "hover:bg-gray-50"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(pager.currentPage + 1)}
          disabled={pager.currentPage === pager.totalPages}
          className={`outline-none ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
            pager.currentPage === pager.totalPages
              ? "cursor-default"
              : "hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * defaultPageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {currentPage * defaultPageSize > totalDocs
                ? totalDocs
                : currentPage * defaultPageSize}
            </span>{" "}
            of <span className="font-medium">{totalDocs}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => setPage(1)}
              disabled={pager.currentPage === 1}
              className=""
              className={`outline-none relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                pager.currentPage === 1 ? "cursor-default" : "hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              disabled={pager.currentPage === 1}
              onClick={() => setPage(pager.currentPage - 1)}
              className={`outline-none bg-white border-gray-300 text-gray-500 relative inline-flex items-center px-2 py-2 border text-sm font-medium ${
                pager.currentPage === 1 ? "cursor-default" : "hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

            {pager.pages.map((page, index) => (
              <button
                key={index}
                aria-current="page"
                onClick={() => setPage(page)}
                className={`outline-none bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  pager.currentPage === page &&
                  "border-gray-100 bg-gray-100 z-10 text-brand-000000b8 border-brand-000000b8"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setPage(pager.currentPage + 1)}
              disabled={pager.currentPage === pager.totalPages}
              className={`outline-none bg-white border-gray-300 text-gray-500 relative inline-flex items-center px-2 py-2 border text-sm font-medium ${
                pager.currentPage === pager.totalPages
                  ? "cursor-default"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => setPage(pager.totalPages)}
              disabled={pager.currentPage === pager.totalPages}
              className={`outline-none relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 ${
                pager.currentPage === pager.totalPages
                  ? "cursor-default"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
