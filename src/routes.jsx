import Cookies from "js-cookie";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterBank from "./pages/Khusus/DataMasterBank"
import LandingPage from "./pages/Umum/LandingPage"
import NotFoundPage from "./pages/NotFoundPage"
import DaftarKantorCabang from "./pages/Khusus/DataMasterKantorCabang";
import DataMasterKaryawanKantorCabang from "./pages/Khusus/DataMasterKaryawanKantorCabang"
import FormUpsertKantorCabang from "./pages/Khusus/UpsertKantorCabang";
import DataMasterAlamat from "./pages/Khusus/DataMasterAlamat";
import AccessDenied from "./pages/AccessDenied";
import Dashboard from "./pages/Khusus/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import LandingPage from "./pages/Umum/LandingPage";
import Login from "./pages/Umum/Login";

const ProtectedRoute = () => {
  const user = JSON.parse(Cookies.get("user") ?? null);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    // return <Outlet />;
    return <Outlet />;
  }
};

const Session = ({ children }) => {
  const user = JSON.parse(Cookies.get("user") ?? null);
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    return children;
  }
};

const AccessRoleAdminValidation = ({ children }) => {
  const user = JSON.parse(Cookies.get("user") ?? null);

  if (user?.role !== "Admin") {
    return <AccessDenied />;
  } else {
    return children;
  }
};

const AccessRoleNasabahValidation = ({ children }) => {
  const user = JSON.parse(Cookies.get("user") ?? null);

  if (user?.role !== "Nasabah") {
    return <AccessDenied />;
  } else {
    return children;
  }
};
const AccessRoleMantriValidation = ({ children }) => {
  const user = JSON.parse(Cookies.get("user") ?? null);

  if (user?.role !== "Mantri") {
    return <AccessDenied />;
  } else {
    return children;
  }
};
const AccessRoleManagerValidation = ({ children }) => {
  const user = JSON.parse(Cookies.get("user") ?? null);

  if (user?.role !== "Manager") {
    return <AccessDenied />;
  } else {
    return children;
  }
};
const AccessRoleSupervisorValidation = ({ children }) => {
  const user = JSON.parse(Cookies.get("user") ?? null);

  if (user?.role !== "Supervisor") {
    return <AccessDenied />;
  } else {
    return children;
  }
};

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
      <Session>
        <Login />
      </Session>
    ),
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      //admin
      {
        path: "dashboard",
        index: true,
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus breadcrumbs={"Dashboard"} navLinkActive={"Dashboard"}>
              <Dashboard />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
      {
        path: "data-master/bank",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"Data Master Bank"}
              navLinkActive={"Data Master"}
              subNavLinkActive={"Bank"}
            >
              <DataMasterBank />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
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
      {
        path: "data-master/kantor-cabang",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"Data Master Kantor Cabang"}
              navLinkActive={"Data Master"}
              subNavLinkActive={"Kantor Cabang"}
            >
              <DaftarKantorCabang />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
    ],
  },
  {
    path: "/data-master/kantor-cabang",
    element: (
      <LayoutKhusus breadcrumbs="Kantor Cabang" navLinkActive="Data Master" subNavLinkActive="Kantor Cabang">
        <DaftarKantorCabang />
      </LayoutKhusus>
    )
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
    path: "/data-master/kantor-cabang/edit/:idCabang",
    element: (
      <LayoutKhusus breadcrumbs="Kantor Cabang/Edit Data">
        <FormUpsertKantorCabang/>
      </LayoutKhusus>
    )
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
    path: "/data-master/:namaCabang/:idCabang/karyawan",
    element: (
      <LayoutKhusus breadcrumb="Data Master Bank">
      <DataMasterKaryawanKantorCabang />
      </LayoutKhusus>
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
