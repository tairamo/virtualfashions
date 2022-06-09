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
            useLink
            link="/support/terms"
            title="Terms of Service"
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            useLink
            title="Privacy"
            link="/support/privacy"
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            title="Careers"
            link="/career"
            className="text-13px mr-2.5 p-2.5"
          />
          <FooterLinkWidget
            title="Help"
            link="/support/faq"
            useLink
            className="text-13px mr-2.5 p-2.5"
          />
        </div>
      </div>
    </footer>
  );
}
