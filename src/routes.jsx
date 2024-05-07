import { createBrowserRouter } from "react-router-dom";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterAlamat from "./pages/Khusus/DataMasterAlamat";
import DataMasterBank from "./pages/Khusus/DataMasterBank";
import DataSektorUsaha from "./pages/Khusus/DataSektorUsaha";
import DataMasterRole from "./pages/Khusus/DataMasterRole";
import UserManagementEmployee from "./pages/Khusus/UserManagementEmployee";
import UpsertUserManagementEmployee from "./pages/Khusus/UpsertUserManagementEmployee";
import UpsertDataMasterBank from "./pages/Khusus/UpsertDataMasterBank";
import LandingPage from "./pages/Umum/LandingPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Register from "./pages/Umum/Register.jsx";
import LayoutAuth from "./components/layout/LayoutAuth.jsx";

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
    path: "/data-master/sektor-usaha",
    element: (
      <LayoutKhusus 
        breadcrumbs="Data Master / Sektor Usaha"
        navLinkActive="Data Master"
        subNavLinkActive="Sektor Usaha">
        <DataSektorUsaha />
      </LayoutKhusus>
    )
  },
  {
    path: "/register",
    element: (
      <LayoutAuth>
        <Register></Register>
      </LayoutAuth>
    )
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
