export const Input = ({ name, label, register, error, ...props }) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={props.id || ""}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1">
        <input
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          {...props}
          {...register(name)}
        />
      </div>
      {error && <p className="text-xs leading-6 text-red-500">{error}</p>}
    </div>
  );
};
