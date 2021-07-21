import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Image } from "../widget/image";
import { AGE_VERIFIED, DISNEY_URL } from "../../constants";
import { setLocalStorage } from "../../utils/localStorage";

export default function LoadingOverlay({ modal, showModal }) {
  const [isOver18, setIsOver18] = useState();

  const router = useRouter();

  useEffect(() => {
    if (isOver18 === "Yes") {
      // Set local storage
      setLocalStorage(AGE_VERIFIED, true);

      // Hide model
      showModal();
    } else if (isOver18 === "No") {
      router.push(DISNEY_URL);
    }
  }, [isOver18]);

  return (
    <div className="bg-gray-600 m-auto z-40 inset-0 flex text-white p-4 rounded-lg">
      <div className="w-full h-full m-auto flex items-center justify-center">
        <div className="flex-none m-auto text-center space-y-4">
          <p className="text-3xl font-bold">Are you over 18?</p>
          <div className="">
            <Image
              alt="brittney"
              url="/placeholders/brittney.jpg"
              className="rounded-lg shadow-lg max-w-18.75 max-h-18.75 mx-auto min-w-0 min-h-0"
            />
          </div>

          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <label className="text-xl font-bold">YES</label>
              <input
                type="radio"
                className="focus:rind-offset-2 focus:ring-black border-transparent text-black"
                name="over18"
                value={isOver18}
                onChange={() => setIsOver18("Yes")}
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <label className="text-xl font-bold">NO</label>
              <input
                type="radio"
                className="focus:rind-offset-2 focus:ring-black border-transparent text-black"
                name="under18"
                value={isOver18}
                onChange={() => setIsOver18("No")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
