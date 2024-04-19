import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ path, element: Element, ...props }) => {
  // const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);
  const user = useSelector((state) => state?.auth.user);

  return user !== null && Object.keys(user).length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
};
