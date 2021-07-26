import IconSmall from "../icons/iconSmall";

export const ErrorMsg = ({ msg }) => {
  return (
    <div className="flex flex-row items-center">
      <div className="min-w-2rem w-8 mr-2">
        <IconSmall type="error" />
      </div>
      {msg}
    </div>
  );
};
