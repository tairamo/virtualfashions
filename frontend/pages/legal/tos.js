import * as fs from "fs";
import * as path from "path";
import showdown from "showdown";

function TOS({ html }) {
  return (
    <div className="px-16" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(
    process.cwd(),
    "legal/nifty-termsOfServiceAgreement.md"
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

export default TOS;
