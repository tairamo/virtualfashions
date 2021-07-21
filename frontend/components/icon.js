export default function Icon() {
  return (
    <>
      <img
        className="block lg:hidden h-8 w-auto"
        src="/niftyicon.svg"
        alt="Nifty"
      />
      <img
        className="hidden lg:block h-8 w-auto"
        src="/logo.png"
        alt="NiftyNudes"
      />
    </>
  );
}
