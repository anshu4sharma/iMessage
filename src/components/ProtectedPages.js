import React from "react";
import { Outlet, Navigate } from "react-router-dom";
const authToken = localStorage.getItem("authtoken");

export const ProtectedPages = () => {
  return authToken ? <Outlet /> : <Navigate to={"/"} />;
};

export const ProtectedAuthPages = () => {
  return authToken ? <Navigate to={"/chat"} /> : <Outlet />;
};
