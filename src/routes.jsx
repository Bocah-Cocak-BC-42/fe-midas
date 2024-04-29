import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Umum/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Khusus/DataMasterBank"
import DataMasterKantorCabang from "./pages/Khusus/DataMasterKantorCabang";
import DataKaryawanKantorCabang from "./pages/Khusus/DataMasterKaryawanKantorCabang";
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
      <LayoutKhusus breadcrumb="Data Master/Kantor Cabang">
      <DataMasterKantorCabang />
      </LayoutKhusus>
    ),
  },
  {
    path: "/data-master/kantor-cabang/karyawan",
    element: (
      <LayoutKhusus breadcrumb="Kantor Cabang/Karyawan">
      <DataKaryawanKantorCabang />
      </LayoutKhusus>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
