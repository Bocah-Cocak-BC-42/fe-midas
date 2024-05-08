import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from 'react';

function TableActions({ children }) {
  const ref = useRef();
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(["left-0", "top-0"]);
  useEffect(() => {
    let tempPostion = ["left-0", "top-0"];
    const docRightOffset = document.scrollingElement.scrollWidth;
    // const rightOffset = ref.current.getBoundingClientRect().right + ref.current.clientWidth;
    const rightOffset = ref.current.getBoundingClientRect().right + 100; // Sementara
    if (rightOffset >= docRightOffset) tempPostion[0] = "right-0";

    const docBottomtOffset = document.scrollingElement.scrollHeight;
    // const bottomOffset = ref.current.getBoundingClientRect().bottom + ref.current.clientHeight;
    const bottomOffset = ref.current.getBoundingClientRect().bottom + 100; // Sementara
    if (bottomOffset >= docBottomtOffset) tempPostion[1] = "bottom-0";

    setPosition(tempPostion);
  }, []);

  return (
    <div
      ref={ref}
      className={"relative"}
    >
      <button className={"px-2"} onClick={() => { setShow(!show) }}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
      <div
        className={`${position.join(" ")} flex-col gap-1 p-2 w-32 rounded-md bg-white shadow absolute z-10`}
        style={{ display: show ? "flex" : "none" }}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(false)}
      >{children}</div>
    </div>
  )
}

export default TableActions
