import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import classes from "./userSharedLayout.module.scss";
import { Navigate } from "react-router-dom";

const userSharedLayout = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace/>;
  }

  return (
    <div>
      <Header />
      <div className={classes.layoutWrapper}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default userSharedLayout;
