import { ReactComponent as SpinnerIcon } from "../../../public/icons/spinner.svg";

export const Spinner = ({ color }) => {
  return (
    <div className="w-8 animate-spin">
      <SpinnerIcon className={`w-8 h-8 ${color}`} />
    </div>
  );
};
