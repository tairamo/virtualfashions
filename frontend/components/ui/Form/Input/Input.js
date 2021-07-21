export const Input = ({
  name,
  label,
  register,
  error,
  disabled,
  className,
  ...props
}) => {
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
          className={`appearance-none block w-full transition-all duration-300 ease-trans-expo px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:outline-none focus:ring-black focus:border-black sm:text-sm ${className} ${
            disabled && "bg-gray-300"
          }`}
          {...props}
          {...register(name)}
        />
      </div>
      {error && <p className="text-xs leading-6 text-red-500">{error}</p>}
    </div>
  );
};
