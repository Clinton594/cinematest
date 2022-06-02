import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../../constants/routes";

export default function Protected() {
  const { user } = useSelector((store) => store);
  if (!user.isLoggedIn) return <Navigate to={routes.home} />;
  return <Outlet />;
}
