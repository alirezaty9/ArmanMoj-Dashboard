import React, { useContext, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  const { userAuthLevel } = useContext(AuthContext);

  useEffect

  if (userAuthLevel === null) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Layout;
