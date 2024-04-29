import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Umum/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Khusus/DataMasterBank"
import DaftarKantorCabang from "./pages/Khusus/DataMasterKantorCabang";
import DataMasterKaryawanKantorCabang from "./pages/Khusus/DataMasterKaryawanKantorCabang"
import LayoutKhusus from "./components/layout/LayoutKhusus";

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
      <LayoutKhusus breadcrumb="Data Master Bank">
      <DataMasterBank />
      </LayoutKhusus>
    ),
  },
  {
    path: "/data-master/kantor-cabang",
    element: (
      <LayoutKhusus breadcrumb="Data Master Bank">
      <DaftarKantorCabang />
      </LayoutKhusus>
    ),
  },
  {
    path: "/data-master/kantor-cabang/karyawan",
    element: (
      <LayoutKhusus breadcrumb="Data Master Bank">
      <DataMasterKaryawanKantorCabang />
      </LayoutKhusus>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
