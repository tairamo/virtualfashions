import Loading from "../../loading/Spinner";

export const Button = ({
  text,
  type = "button",
  isSubmitting,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {!isSubmitting ? text : <Loading />}
    </button>
  );
};
