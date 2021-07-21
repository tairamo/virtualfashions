export const Image = ({ alt, url, className, bgImage }) => {
  return bgImage ? (
    <div
      className={className}
      style={{
        backgroundImage: `url(${url})`,
      }}
    ></div>
  ) : (
    <img alt={alt || "nifty-image"} src={url} className={className} />
  );
};
