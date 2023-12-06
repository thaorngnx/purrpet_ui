import { Outlet, Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import * as CONST from "./constants";

export const ProtectedCustomerRoutes = () => {
  let isCustomer = false;

  const accessToken = Cookie.get(import.meta.env.VITE_APP_COOKIE_ACCESS_TOKEN, {
    path: "/",
  });

  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (decoded.role === CONST.ROLE.CUSTOMER) {
      isCustomer = true;
    }
  }
  return isCustomer ? <Outlet /> : <Navigate to="/lookup" replace={true} />;
};
