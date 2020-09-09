import Link from "next/link";
import * as vivid from "vivid-studio";

if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development"
  // && /VIVID_ENABLED=true/.test(document.cookie)
) {

  vivid.then((e) => e.run())
  // import("vivid-studio").then((v) => v.run());
  import("vivid-studio/style");
}
export default function CtaRegister() {
  return (
    <div className="bg-white mt-12">
      {/* 2 x SIDE BY SIDE IMAGE GOES HERE */}

      
{/* 
      <div className=" " style={{
  backgroundImage: 'url("https://viveca33101.us-east-1.linodeobjects.com/vf-sample.jpeg")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  }}> */}

      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Explore, Buy and Sell</span>
          <span className="block">luxury fashion NFTs</span>
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
      {/* </div> */}
      </div>

    </div>
  );
}
