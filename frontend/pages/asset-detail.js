import Layout from "../components/layout";

function AsssetDetail() {
  return (
    <Layout>
      <main className="w-screen h-2/3 flex items-center justify-center bg-brand-f2f2f2">
        <div className="m-16">
          <img
            src="/placeholders/napoleon.png"
            className="w-auto h-96 shadow-lg rounded-lg"
          />
        </div>
      </main>
      <div className="bg-white grid grid-cols-2">
        <div className="my-16 mx-8">
          <h1> Samanthas 🍑</h1>

          <span> Descritopn </span>
          <p>
            Smooth. Firm yet jelly.
            <br />
            <br />
            6000x6000
          </p>
        </div>

        <div className="my-16 mx-8">
          <div className="shadow-lg bg-white rounded-lg w-full h-32">
            {/* Bid Card */}
          </div>

          <div>
            <h1>History </h1>

            {/* Bid Histary */}
          </div>
        </div>
      </div>

      <div className="w-full h-32">
        <h1> Creator </h1>
      </div>
    </Layout>
  );
}

export default AsssetDetail;
