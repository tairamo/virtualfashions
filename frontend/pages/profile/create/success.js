import Link from "next/link";
import Layout from "../../../components/layout";

export default function SuccessfulUpload() {
  return (
    <Layout>
      <div>
        <h1>
          {" "}
          To make sure its not childporn we review all content. You will get an
          email notification when approved or a door knock by the Feds.{" "}
        </h1>

        <Link href="/">
          <button>Cool</button>
        </Link>
      </div>
    </Layout>
  );
}
