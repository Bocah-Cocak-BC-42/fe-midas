import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Umum/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Khusus/DataMasterBank";
import LayoutKhusus from "./components/layout/LayoutKhusus";
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
      <LayoutKhusus
        breadcrumbs="Data Master Bank"
        navLinkActive="Data Master"
        subNavLinkActive="Bank"
      >
        <DataMasterBank />
      </LayoutKhusus>
    ),
  },
  {
    path: "/data-master/role",
    element: (
      <LayoutKhusus breadcrumbs="Data Master Role">
        <DataMasterRole />
      </LayoutKhusus>
    ),
    path: "/khusus",
    element: <LayoutKhusus></LayoutKhusus>,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
