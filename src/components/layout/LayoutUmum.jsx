import { Outlet } from "react-router-dom";
import HeaderUmum from "../header/HeaderUmum";

function LayoutUmum({ children }) {
  return (
    <>
      <HeaderUmum />
      <Outlet />
    </>
  );
}

export default LayoutUmum;
