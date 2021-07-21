export default function Icon() {
  return (
    <>
      <img
        className="block lg:hidden h-8 w-auto"
        src="/placeholders/vfs.png"
        alt="logo"
      />
      <img
        className="hidden lg:block h-8 w-auto"
        src="/placeholders/vfs.png"
        alt="logo"
      />
    </>
  );
}
