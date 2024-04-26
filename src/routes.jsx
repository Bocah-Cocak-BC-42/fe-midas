import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Karyawan/DataMasterBank";
import DataMasterKantorCabang from "./pages/Karyawan/DataMasterKantorCabang"
import DataMasterKaryawanKantorCabang from "./pages/Karyawan/DataMasterKaryawanKantorCabang"

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
    path: "/data-master/kantor-cabang",
    element: (
      // <LayoutKhusus breadcrumb="Data Master Bank">
      <DataMasterKantorCabang />
      // </LayoutKhusus>
    ),
  },
  {
    path: "/data-master/kantor-cabang/karyawan",
    element: (
      // <LayoutKhusus breadcrumb="Data Master Bank">
      <DataMasterKaryawanKantorCabang />
      // </LayoutKhusus>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
