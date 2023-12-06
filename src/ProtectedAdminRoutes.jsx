import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import * as CONST from "./constants";

export const ProtectedAdminRoutes = () => {
  let isAdmin = false;

  const accessToken = Cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, {
    path: "/admin",
  });
  console.log(accessToken);

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (decoded.role === CONST.ROLE.ADMIN) {
      isAdmin = true;
    }
  }
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" />;
};
