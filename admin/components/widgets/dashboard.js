import { Button } from "../../components/ui/Button";

export const DashboradWidget = ({
  text,
  title,
  amount,
  showButton,
  loading,
  withdraw,
  isDisabled,
}) => {
  return (
    <div className="flex flex-col justify-between rounded-lg min-h-15.625 min-w-15.625 p-6 bg-white shadow-3xl">
      <div className="grid gap-8 grid-cols-1fr">
        <div className="font-semibold text-xl md:text-lg dl:text-xl text-gray-600">
          {title}
        </div>
        <div className="text-lg md:text-base dl:text-lg">
          <span className="font-bold">{amount.toFixed(2)}</span> ETH
        </div>
      </div>

      {showButton && (
        <div>
          <Button
            text={text}
            onClick={withdraw}
            isSubmitting={loading}
            disabled={amount <= 0 || loading || isDisabled}
            className={`md:py-4 px-6 rounded-2xl appearance-none inline-block text-base text-center font-semibold px-2 py-4 border-2 min-h-3.75 h-3.75 w-full leading-1.2 focus:outline-none text-white bg-black border-brand-000000b8 ${
              amount <= 0 || loading || isDisabled
                ? "cursor-default opacity-50"
                : "transform-2px hover:shadow-btn transition-all duration-300 ease-trans-expo"
            }`}
          />
        </div>
      )}
    </div>
  );
};
