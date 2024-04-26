import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Karyawan/DataMasterBank";
import DataMasterRole from "./pages/Karyawan/DataMasterRole";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayoutUmum>
        <LandingPage />
      </LayoutUmum>
    ),
  },
  {
    path: "/data-master/bank",
    element: (
      // <LayoutKhusus breadcrumb="Data Master Bank">
      <DataMasterBank />
      // </LayoutKhusus>
    ),
  },
  {
    path: "/data-master/role",
    element: (
      // <LayoutKhusus breadcrumb="Data Master Bank">
      <DataMasterRole />
      // </LayoutKhusus>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
