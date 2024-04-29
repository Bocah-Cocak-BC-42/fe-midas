import HeaderUmum from "../header/HeaderUmum";

function LayoutUmum({ children }) {
  return (
    <>
      <HeaderUmum />
      {children}
    </>
  );
}

export default LayoutUmum;
