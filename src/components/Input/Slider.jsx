import { useState } from "react";

function Slider(props) {
    const {defaultValue, name,min,step, max, children, change ,onChange } = props;
    
  return (
    <>
    <label htmlFor={name} className="block mb-2 text-2xl font-bold text-black dark:text-[#C07F00]">{children}</label>
    <p className="text-xl">{change}</p>
    <input type="range" id={name} defaultValue={defaultValue} step={step} name={name} onChange={onChange} min={min} max={max} className="w-full bg-gray-200 rounded-lg cursor-pointer"></input>
    </>
  )
}

export default Slider
