import Cookies from "js-cookie";
import { Navigate, Outlet, createBrowserRouter, useParams } from "react-router-dom";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import LayoutUmum from "./components/layout/LayoutUmum";
import LandingPage from "./pages/Umum/LandingPage"
import NotFoundPage from "./pages/NotFoundPage"
import DaftarKantorCabang from "./pages/Khusus/DataMasterKantorCabang";
import DataMasterKaryawanKantorCabang from "./pages/Khusus/DataMasterKaryawanKantorCabang"
import FormUpsertKantorCabang from "./pages/Khusus/UpsertKantorCabang";
import DataMasterAlamat from "./pages/Khusus/DataMasterAlamat";
import AccessDenied from "./pages/AccessDenied";
import Dashboard from "./pages/Khusus/Dashboard";
import DataMasterBank from "./pages/Khusus/DataMasterBank";
import DataSektorUsaha from "./pages/Khusus/DataSektorUsaha";
import DataMasterRole from "./pages/Khusus/DataMasterRole";
import UserManagementEmployee from "./pages/Khusus/UserManagementEmployee";
import UpsertUserManagementEmployee from "./pages/Khusus/UpsertUserManagementEmployee";
import Register from "./pages/Umum/Register.jsx";
import LayoutAuth from "./components/layout/LayoutAuth.jsx";
import Login from "./pages/Umum/Login";
import UserManagementCustomer from "./pages/Khusus/UserManagementCustomer";
import PengajuanKreditPerseorangan from "./pages/Khusus/PengajuanKreditPerseorangan.jsx"

const ProtectedRoute = () => {
  const user = JSON.parse(Cookies.get("user") ?? null);
  let { role } = useParams()
  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    if(role === user.role.toLowerCase())
      return <Outlet />;
    else
      return <AccessDenied/>
  }
};

const Session = ({ children }) => {
  const user = JSON.parse(Cookies.get("user") ?? null);
  if (user && user?.role === "Admin") {
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
      <LayoutAuth>
        <Session>
          <Login />
        </Session>
      </LayoutAuth>
    ),
  },
  {
    path: "/register",
    element: (
      <LayoutAuth>
        <Register />
      </LayoutAuth>
    )
  },
  {
    path: '/:role',
    element: <ProtectedRoute/>,
    children: [
      {
        path: "dashboard",
        index: true,
        element: (
          <LayoutKhusus breadcrumbs={"Dashboard"} navLinkActive={"Dashboard"}>
            <Dashboard />
          </LayoutKhusus>
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
        path: "user-management/karyawan",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"User Management - Karyawan"}
              navLinkActive={"User Management"}
              subNavLinkActive={"Karyawan"}
            >
              <UserManagementEmployee />
             </LayoutKhusus>
          </AccessRoleAdminValidation>
          )
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
      {
        path: "user-management/karyawan/upsert",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"User Management - Karyawan"}
              navLinkActive={"User Management"}
              subNavLinkActive={"Karyawan"}
            >
              <UpsertUserManagementEmployee />
             </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
      {
        path: "data-master/kantor-cabang/tambah",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"Data Master Kantor Cabang"}
              navLinkActive={"Data Master"}
              subNavLinkActive={"Kantor Cabang"}
            >
              <FormUpsertKantorCabang />
                 </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
      {
        path: "user-management/karyawan/upsert/:id",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"User Management - Karyawan"}
              navLinkActive={"User Management"}
              subNavLinkActive={"Karyawan"}
            >
              <UpsertUserManagementEmployee />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
      {
        path: "data-master/kantor-cabang/karyawan/:id",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"Data Master Kantor Cabang"}
              navLinkActive={"Data Master"}
              subNavLinkActive={"Kantor Cabang"}
            >
              <DataMasterKaryawanKantorCabang />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
      {
        path: "user-management/nasabah",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"User Management Nasabah"}
              navLinkActive={"User Management"}
              subNavLinkActive={"Nasabah"}
              >
                <UserManagementCustomer/>
              </LayoutKhusus>
           </AccessRoleAdminValidation>
        )
      },
       {
        path: "data-master/kantor-cabang/edit/:id",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"Data Master Kantor Cabang"}
              navLinkActive={"Data Master"}
              subNavLinkActive={"Kantor Cabang"}
            >
              <FormUpsertKantorCabang />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
      {
        path: "data-master/role",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus
              breadcrumbs={"Data Master Role"}
              navLinkActive={"Data Role"}
              subNavLinkActive={"Role"}
            >
              <DataMasterRole />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        ),
      },
      {
        path: "data-master/sektor-usaha",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus 
              breadcrumbs="Data Master / Sektor Usaha"
              navLinkActive="Data Master"
              subNavLinkActive="Sektor Usaha">
              <DataSektorUsaha />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        )
      },
      {
        path: "data-master/sektor-usaha",
        element: (
          <AccessRoleAdminValidation>
            <LayoutKhusus 
              breadcrumbs="Data Master / Sektor Usaha"
              navLinkActive="Data Master"
              subNavLinkActive="Sektor Usaha">
              <DataSektorUsaha />
            </LayoutKhusus>
          </AccessRoleAdminValidation>
        )
      },
      {
        path: "perseorangan",
        element: (
          <AccessRoleNasabahValidation>
            <LayoutKhusus 
              breadcrumbs="Perseorangan"
              navLinkActive="Pengajuan Kredit"
              subNavLinkActive="Perseorangan">
              <PengajuanKreditPerseorangan/>
            </LayoutKhusus>
          </AccessRoleNasabahValidation>
        )
      }
    ],
  },
  // {
  //   path: "/data-master/alamat",
  //   element: (
  //     <LayoutKhusus
  //       breadcrumbs="Data Master Alamat"
  //       navLinkActive="Data Master"
  //       subNavLinkActive="Alamat"
  //     >
  //       <DataMasterAlamat />
  //     </LayoutKhusus>
  //   ),
  // },
  // {
  //   path: "/data-master/kantor-cabang/edit/:idCabang",
  //   element: (
  //     <LayoutKhusus breadcrumbs="Kantor Cabang/Edit Data">
  //       <FormUpsertKantorCabang/>
  //     </LayoutKhusus>
  //   )
  // },
  // {
  //   path: "/data-master/kantor-cabang/tambah",
  //   element: (
  //     <LayoutKhusus breadcrumbs="Kantor Cabang/Tambah Data">
  //       <FormUpsertKantorCabang/>
  //     </LayoutKhusus>
  //   )
  // },
  // {
  //   path: "/data-master/:namaCabang/:idCabang/karyawan",
  //   element: (
  //     <LayoutKhusus breadcrumb="Data Master Bank">
  //     <DataMasterKaryawanKantorCabang />
  //     </LayoutKhusus>
  //   ),
  // },
  // {
  //   path: "/data-master/kantor-cabang/karyawan",
  //   element: (
  //     // <LayoutKhusus breadcrumb="Data Master Bank">
  //     <DataMasterKaryawanKantorCabang />
  //     // </LayoutKhusus>
  //   ),
  // },
  // {
  //   path: "/data-master/kantor-cabang",
  //   element: (
  //     // <LayoutKhusus breadcrumb="Data Master Bank">
  //     <DataMasterKantorCabang />
  //     // </LayoutKhusus>
  //   ),
  // },
  // {
  //   path: "/data-master/kantor-cabang/karyawan",
  //   element: (
  //     // <LayoutKhusus breadcrumb="Data Master Bank">
  //     <DataMasterKaryawanKantorCabang />
  //     // </LayoutKhusus>
  //   ),
  // },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
