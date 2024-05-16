function Input(props) {
  const {
    type,
    accept,
    name,
    placeholder,
    defaultValue,
    disabled,
    required,
    message,
    onChange,
    pattern,
    grow,
    children,
  } = props;
  return (
    <>
      <div className="flex items-center gap-2">
        <label htmlFor={name} className="w-[150px]">
          {children}
        </label>
        <input
          type={type}
          accept={accept}
          name={name}
          id={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onChange={onChange}
          pattern={pattern}
          className={`p-1 border-2 border-slate-300 rounded-md ${grow && "grow"}`}
        />
      </div>
      <span className="text-red-500">{message}</span>
    </>
  );
}

export default Input;
