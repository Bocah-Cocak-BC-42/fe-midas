import Cookies from "js-cookie";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Khusus/DataMasterBank"
import DaftarKantorCabang from "./pages/Khusus/DataMasterKantorCabang";
import DataMasterKaryawanKantorCabang from "./pages/Khusus/DataMasterKaryawanKantorCabang"
import FormUpsertKantorCabang from "./pages/Khusus/UpsertKantorCabang";
import DataMasterAlamat from "./pages/Khusus/DataMasterAlamat";
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
    path: "/login",
    element: (
      <LayoutKhusus breadcrumb="Data Master Bank">
      <DataMasterBank />
      </LayoutKhusus>
    ),
    children: [
      {
        path: "data-master/alamat",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"Data Master Alamat"}
              navLinkActive={"Data Master"}
              subNavLinkActive={"Alamat"}
            >
              <DataMasterAlamat />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
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
    path: "/data-master/kantor-cabang/tambah",
    element: (
      <LayoutKhusus breadcrumbs="Kantor Cabang/Tambah Data">
        <FormUpsertKantorCabang/>
      </LayoutKhusus>
    )
  },
  {
    path: "/data-master/kantor-cabang/:idCabang/karyawan",
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
