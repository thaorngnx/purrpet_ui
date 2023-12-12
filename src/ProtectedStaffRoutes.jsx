import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import * as CONST from "./constants";

export const ProtectedStaffRoutes = () => {
  let isStaff = false;

  const accessToken = Cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, {
    path: "/staff",
  });

  console.log(window.location.pathname);

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (decoded.role === CONST.ROLE.STAFF) {
      isStaff = true;
    }
  }
  return isStaff ? <Outlet /> : <Navigate to="/staff/login" replace={true} />;
};
