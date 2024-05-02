import { createBrowserRouter } from "react-router-dom";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterAlamat from "./pages/Khusus/DataMasterAlamat";
import DataMasterBank from "./pages/Khusus/DataMasterBank";
import LayoutKhusus from "./components/layout/LayoutKhusus";
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
    children: [
      {
        path: "upsert",
        element: (
          <LayoutKhusus
            breadcrumbs="Data Master Bank"
            navLinkActive="Data Master"
            subNavLinkActive="Bank"
          >
            <UpsertDataMasterBank />,
          </LayoutKhusus>
        ),
      },
    ],
  },
  {
    path: "/data-master/alamat",
    element: (
      <LayoutKhusus
        breadcrumbs="Data Master Alamat"
        navLinkActive="Data Master"
        subNavLinkActive="Alamat"
      >
        <DataMasterAlamat />
      </LayoutKhusus>
    ),
  },
  {
    path: "/khusus",
    element: <LayoutKhusus></LayoutKhusus>,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
