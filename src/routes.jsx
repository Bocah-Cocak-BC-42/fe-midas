import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Karyawan/DataMasterBank";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import DataSektorUsaha from "./pages/Karyawan/DataSektorUsaha";

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
    path: "/data-master/sektor-usaha",
    element: (
      <LayoutKhusus breadcrumbs="Data Master / Sektor Usaha">
        <DataSektorUsaha />
      </LayoutKhusus>
    )
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
