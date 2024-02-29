import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

export const DatePicker = ({ control, name, placeholder, disabled }) => {
  return (
    <>
      {/* <Controller
        control={control}
        name={name}
        render={({ onChange, value }) => (
          <ReactDatePicker
            dateFormat="yyyy-MM-dd"
            disabled={disabled}
            onChange={onChange}
            selected={value}
            className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[40vw]"
            autoComplete="off"
            placeholderText={placeholder}
          />
        )}
      /> */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <ReactDatePicker
            className="h-12 w-[300px] rounded-lg border-2 border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-500 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[40vw]"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            dateFormat="yyyy-MM-dd"
            disabled={disabled}
            placeholderText={placeholder}
          />
        )}
      />
    </>
  );
};
