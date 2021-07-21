import Link from "next/link";

export default function CtaRegister() {
  return (
    <div className="bg-white mt-12">
      {/* 2 x SIDE BY SIDE IMAGE GOES HERE */}

      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">What is NFT?</span>
          <span className="block">How do I use NFT?</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow"></div>
          <div className="ml-3 inline-flex">
            <Link href="/support/faq">
              <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-black transition-all duration-300 ease-trans-expo transform-2px hover:shadow-btn">
                Learn more
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
