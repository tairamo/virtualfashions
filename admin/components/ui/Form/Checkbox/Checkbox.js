export const Checkbox = ({ label, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
      />
      {label && (
        <label
          htmlFor={props.id || ""}
          className="ml-2 block text-sm text-gray-900"
        >
          {label}
        </label>
      )}
    </div>
  );
};
