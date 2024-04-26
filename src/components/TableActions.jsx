import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

function TableActions({ children }) {
    const [show, setShow] = useState(false);

    return (
        <div className={"relative"}>
            <button className={"px-2"} onClick={() => { setShow(!show) }}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
            <div
                className={"flex-col gap-1 p-2 w-32 rounded-md bg-white shadow absolute left-4 top-4 z-10"}
                style={{ display: show ? "flex" : "none" }}
            >{children}</div>
        </div>
    )
}

export default TableActions
