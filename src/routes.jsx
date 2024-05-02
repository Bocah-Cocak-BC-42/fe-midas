import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Umum/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Khusus/DataMasterBank";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import UserManagementEmployee from "./pages/Khusus/UserManagementEmployee";
import UpsertUserManagementEmployee from "./pages/Khusus/UpsertUserManagementEmployee";
import UpsertDataMasterBank from "./pages/Khusus/UpsertDataMasterBank";

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
    path: "/khusus",
    element: <LayoutKhusus></LayoutKhusus>,
  },
  {
    path: "/user-management/karyawan/Upsert",
    element:(
      <LayoutKhusus
      breadcrumbs="User Management - Karyawan"
      navLinkActive="User Management"
      subNavLinkActive= "Karyawan"
      >
        <UpsertUserManagementEmployee/>
      </LayoutKhusus>
    )
  },
  {
    path: "/user-management/karyawan/Upsert/:employeeId",
    element:(
      <LayoutKhusus
      breadcrumbs="User Management - Karyawan"
      navLinkActive="User Management"
      subNavLinkActive= "Karyawan"
      >
        <UpsertUserManagementEmployee/>
      </LayoutKhusus>
    )
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
