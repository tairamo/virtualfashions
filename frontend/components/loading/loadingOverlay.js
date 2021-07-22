import Image from "next/image";

export default function curtain({ active }) {
  if (active) {
    return (
      <div className="fixed bg-black bg-opacity-50 m-auto z-40 inset-0 flex">
        <div className="w-screen h-screen m-auto flex items-center justify-center">
          <div className="flex-non m-auto text-center">
            <img src="/token-loading.gif" className="w-40 h-40" />
            <p className="text-xl">Minting</p>
            <p>
              This make take a while depending the size of the file. <br />{" "}
              Please don't leave this screen.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
