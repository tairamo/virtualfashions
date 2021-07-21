import Loading from "../../loading/Spinner";

export const Button = ({
  text,
  type = "button",
  isSubmitting,
  submittingText = "",
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${
        disabled ? "cursor-default opacity-50" : "hover:bg-black"
      }`}
    >
      {!isSubmitting ? (
        text
      ) : (
        <div>
          <Loading />
          {submittingText ? <span className="ml-2">{submittingText}</span> : ""}
        </div>
      )}
    </button>
  );
};
