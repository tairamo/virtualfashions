import Link from "next/link";

import { Image } from "./widget/image";
import { FooterLinkWidget } from "./widget/links/footer";
import { DISCORD_URL, INSTAGRAM_URL, TWITTER_URL } from "../constants";

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-brand-f2f2f2 max-w-full">
      <div className="flex flex-row flex-wrap items-center mb-10">
        <Link href="/" passHref>
          <a className="mr-4 w-14 no-underline outline-none">
            <Image
              alt="logo"
              url="/placeholders/vfs.png"
              className="w-full h-auto"
            />
          </a>
        </Link>
        <h1 className="text-base text-brand-888 font-semibold">
          Virtual Fashion
        </h1>
      </div>
      <div className="w-full max-w-100 max-auto flex flex-row flex-wrap justify-between">
        <div className="flex items-center flex-row flex-wrap">
          <FooterLinkWidget
            title="Instagram"
            link={INSTAGRAM_URL}
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            title="Twitter"
            link={TWITTER_URL}
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            title="Discord"
            link={DISCORD_URL}
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            title="Blog"
            link="/blog"
            className="text-13px mr-2.5 p-2.5"
          />
        </div>
        <div className="flex items-center flex-row flex-wrap">
          <FooterLinkWidget
            title="Terms of Service"
            link="/terms-of-service"
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            title="Privacy"
            link="/privacy"
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            title="Careers"
            link="/career"
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            title="Help"
            link="/help"
            className="text-13px mr-2.5 p-2.5"
          />
        </div>
      </div>
    </footer>
  );
}

{
  /* <footer className="bg-brand-f2f2f2" aria-labelledby="footerHeading">
  <div className="max-w-50 mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
    <div className="pb-8">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3lg grid-cols-1sm">
        <div className="">
          <h3 className="text-sm font-semibold tracking-wider uppercase">
            Support
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link href="/support/contact" passHref>
                <a className="footer-a">Contact</a>
              </Link>
            </li>

            <li>
              <Link href="/support/faq">
                <a className="footer-a">FAQ</a>
              </Link>
            </li>

            <li>
              <Link href="/support/guides">
                <a className="footer-a">Guides</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wider uppercase">
            Company
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link href="/support/about" passHref>
                <a className="footer-a">About</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h3 className="text-sm font-semibold tracking-wider uppercase">
            Legal
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link href="/support/privacy" passHref>
                <a className="footer-a">Privacy Policy</a>
              </Link>
            </li>

            <li>
              <Link href="/support/terms" passHref>
                <a className="footer-a">Terms Of Service</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-gray-700 pt-8 lg:flex lg:items-center lg:justify-between xl:mt-0">
      <div>
        <h3 className="text-sm font-semibold tracking-wider uppercase">
          Join the community
        </h3>
        <p className="mt-2 text-base text-gray-700">
          Stay up to date with our features, meet other creators and learn
          more
        </p>
      </div>
    </div>
    <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
      <div className="flex space-x-6 md:order-2">
        <a
          target="_blank"
          href="https://twitter.com/niftynudes"
          className="hover:text-brand-888"
        >
          <span className="sr-only">Twitter</span>
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
      </div>
      <p className="mt-8 text-base md:mt-0 md:order-1">
        &copy; 2021 Nifty Nudes LLC
      </p>
    </div>
  </div>
</footer> */
}
