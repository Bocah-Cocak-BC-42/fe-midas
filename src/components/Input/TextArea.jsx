import React from 'react'

function TextArea(props) {
    const {
        rows,
        cols,
        name,
        children,
        noresize,
        grow,
        required,
        disabled,
        defaultValue,
        placeholder,
        onChange,
        message
    } = props
  return (
    <>
    <div className="flex items-center gap-2">
      <label htmlFor={name} className="w-[150px]">
        {children}
      </label>
      <textarea
        cols = {cols}
        rows = {rows}
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        onChange={onChange}
        className={disabled === true
          ? "p-1" + (grow ? " w-full" : "")
          : "p-1 border-2 border-slate-300 rounded-md" + (grow ? " w-full" : "") + " " + (noresize ? "resize-none" : "")
        } 
      />
    </div>
    <span className="text-red-500">{message}</span>
  </>
  )
}

export default TextArea
