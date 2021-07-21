export const Video = ({ url, className, onLoadedData }) => {
  return (
    <video
      loop
      muted
      autoPlay
      src={url}
      playsInline
      className={className}
      onLoadedData={onLoadedData}
    />
  );
};
