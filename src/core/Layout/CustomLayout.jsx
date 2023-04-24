import React from "react";
/* import react router dom packages */
import { Outlet, useLocation } from "react-router-dom";

/* import local components */
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import { LOCAL_SERVICE } from "../services/localServ";

/* import react router packages */

const CustomLayout = () => {
  let location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register") {
    return <Outlet />;
  }

  /* write more conditions here if you like */
  return (
    <>
      <main className="flex flex-col justify-center min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default CustomLayout;
