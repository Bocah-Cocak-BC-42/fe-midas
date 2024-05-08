import { useEffect, useState } from "react";

function Select(props) {
  const { options, name, message, value, children, grow, disabled, handleChange } = props;
  // const [value, setValue] = useState("");
  // useEffect(() => {
  //   setValue(value);
  // }, [value]);

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
          onChange={(e) => {handleChange(e.target.value)}}
          disabled={disabled}
          className={`p-1 border-2 border-slate-300 rounded-md ${
            grow && "grow"
          }`}
        > 
          {options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
          ))}
        </select>
      </div>
      <span className="text-red-500">{message}</span>
    </>
  );
}

export default Select;
