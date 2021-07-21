import IconSmall from "../icons/iconSmall";

export default function validText({ id, type, message }) {
  var color = "";
  var show = type === "hiden" ? false : true;

  if (type == "success") {
    color = "green";
  }
  if (type == "warning") {
    color = "yellow";
  }
  if (type == "error") {
    color = "red";
  }

  return (
    <div
      id={id}
      className={`rounded-md bg-${color}-50 p-4 ${show ? "block" : "sr-only"}`}
    >
      <div className="flex lg:w-52 h-auto ">
        <div className="flex-shrink-0 h-5 w-5">
          <IconSmall type={type} />
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium text-${color}-800`}>{message}</p>
        </div>
      </div>
    </div>
  );
}
