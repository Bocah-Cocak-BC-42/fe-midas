import HeaderUmumComponent from "../header/HeaderUmumComponent";

function LayoutUmum({ children }) {
  return (
    <>
      <HeaderUmumComponent />
      {children}
    </>
  );
}

export default LayoutUmum;
