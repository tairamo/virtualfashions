export const Link = ({ text, ...props }) => {
  return (
    <a {...props} className="font-medium url-link">
      {text}
    </a>
  );
};
