import * as fs from "fs";
import * as path from "path";
import showdown from "showdown";

import Layout from "../../components/layout";
import { DotsWidget } from "../../components/widget/dots";

export default function Terms({ html }) {
  return (
    <Layout>
      <div className="relative py-16 bg-white overflow-hidden my-8">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto text-justify">
            <h1 className="border-0">
              <span className="block text-base text-center text-pink-600 font-semibold tracking-wide uppercase">
                Virtual Fashion
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Terms Of Service
              </span>
            </h1>
            <div className="mt-8 text-gray-500 leading-8">
              <div
                className="py-8"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    "legal/token-termsOfServiceAgreement.html"
  );
  const content = fs.readFileSync(filePath, "utf8");

  const converter = new showdown.Converter();
  const html = converter.makeHtml(content);

  return {
    props: {
      html,
    },
  };
}
