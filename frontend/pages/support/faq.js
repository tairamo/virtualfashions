import Layout from "../../components/layout";
import { DotsWidget } from "../../components/widget/dots";

export default function FAQ() {
  return (
    <Layout>
      <div className="relative py-16 bg-white overflow-hidden my-8">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-pink-600 font-semibold tracking-wide uppercase">
                Virtual Fashion
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                FAQ
              </span>
            </h1>
            <p className="mt-8 text-sm text-gray-500 leading-8">
              Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem.
              At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque id at
              vitae feugiat egestas ac. Diam nulla orci at in viverra
              scelerisque eget. Eleifend egestas fringilla sapien.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
