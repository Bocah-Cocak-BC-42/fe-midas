import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Karyawan/DataMasterBank";
import DataMasterKantorCabang from "./pages/Karyawan/DataMasterKantorCabang"
import DataMasterKaryawanKantorCabang from "./pages/Karyawan/DataMasterKaryawanKantorCabang"
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
      <LayoutKhusus breadcrumbs="Data Master Bank">
        <DataMasterBank />
      </LayoutKhusus>
    ),
  },
  {
    path: "/data-master/kantor-cabang",
    element: (
      <LayoutKhusus breadcrumbs="Data Master/Kantor Cabang">
        <DataMasterKantorCabang />
      </LayoutKhusus>
    ),
  },
  {
    path: "/data-master/kantor-cabang/karyawan",
    element: (
      <LayoutKhusus breadcrumbs="Kantor Cabang/Karyawan">
        <DataMasterKaryawanKantorCabang />
      </LayoutKhusus>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
