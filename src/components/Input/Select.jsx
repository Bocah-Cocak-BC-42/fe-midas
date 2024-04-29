import { useEffect, useState } from "react";

function Select(props) {
  const { options, name, message, defaultValue, children, grow } = props;
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <>
      <div className="flex items-center gap-2">
        <label htmlFor={name} className="w-[150px]">
          {children}
        </label>
        <select
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`p-1 border-2 border-slate-300 rounded-md ${
            grow && "grow"
          }`}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
      <span className="text-red-500">{message}</span>
    </>
  );
}

export default Select;
