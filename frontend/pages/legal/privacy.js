import fs from "fs";
import path from "path";
import showdown from "showdown";

function Privacy({ html }) {
  return (
    <div className="p-16">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "legal/token-privacy.md");
  const content = fs.readFileSync(filePath, "utf8");

  const converter = new showdown.Converter();
  const html = converter.makeHtml(content);

  return {
    props: {
      html,
    },
  };
}

export default Privacy;
