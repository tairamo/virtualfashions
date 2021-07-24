import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

export default function Datepicker(props) {
  const CustomInput = forwardRef((props, ref) => (
    <div className=" ">
      <input
        {...props}
        ref={ref}
        type="text"
        autoComplete="off"
        className="bg-calendar bg-custom bg-18px bg-no-repeat appearance-none block w-full px-5 pb-0.5 pt-4 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-brand focus:border-brand min-h-3.75 h-3.75 outline:none shadow-text-area transition duration-300 trans-expo"
        // className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand sm:text-sm focus:border-brand sm:text-sm"
      />
    </div>
  ));

  return <ReactDatePicker {...props} customInput={<CustomInput />} />;
}
