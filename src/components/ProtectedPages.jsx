import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import {authtoken} from "../constants"

export const ProtectedPages = () => {
  return authtoken ? <Outlet /> : <Navigate to={"/"} />;
};

export const ProtectedAuthPages = () => {
  return authtoken ? <Navigate to={"/chat"} /> : <Outlet />;
};
