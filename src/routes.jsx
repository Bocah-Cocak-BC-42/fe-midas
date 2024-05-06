import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/Umum/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import LayoutUmum from "./components/layout/LayoutUmum";
import DataMasterAlamat from "./pages/Khusus/DataMasterAlamat";
import DataMasterBank from "./pages/Khusus/DataMasterBank";
import LayoutKhusus from "./components/layout/LayoutKhusus";
import Login from "./pages/Umum/Login";
import Cookies from "js-cookie";
import Dashboard from "./pages/Khusus/Dashboard";
import AccessDenied from "./pages/AccessDenied";

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
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
