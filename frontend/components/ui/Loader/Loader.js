export const Loader = ({ height = 100 }) => {
  return (
    <div>
      <img
        className="mx-auto w-auto"
        src="/nifty-loading.gif"
        alt="Loading..."
        style={{ height: `${height}px` }}
      />
    </div>
  );
};
