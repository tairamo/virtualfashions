import { Spinner } from "../Spinner/Spinner";

export const Loader = ({ height = 60 }) => {
  return (
    <div className="flex flex-col justify-center">
      <img
        alt="Loading..."
        src="/placeholders/vfs.png"
        className="mx-auto w-auto"
        style={{ height: `${height}px` }}
      />
      <div className="mx-auto pt-8">
        <Spinner color="text-black" />
      </div>
    </div>
  );
};
