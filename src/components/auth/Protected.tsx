import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import routes from "../../constants/routes";

export default function Protected() {
  // const { presale } = useSelector((store: IStore) => store);
  // if (!presale.isAdmin) return <Navigate to={routes.presale} />;
  return <Outlet />;
}
