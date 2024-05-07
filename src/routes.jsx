import Cookies from "js-cookie";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import LayoutUmum from "./components/layout/LayoutUmum";
import AccessDenied from "./pages/AccessDenied";
import Dashboard from "./pages/Khusus/Dashboard";
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
    path: "/register",
    element: (
      <LayoutAuth>
        <Register />
      </LayoutAuth>
    )
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
      }
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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
