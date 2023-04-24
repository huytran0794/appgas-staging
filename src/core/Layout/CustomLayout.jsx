import React from "react";
/* import react router dom packages */
import { Outlet, useLocation } from "react-router-dom";
import Spinner from "../Components/Spinner/Spinner";

/* import react router packages */

const CustomLayout = () => {
  let location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/register") {
    return (
      <>
        <Spinner />
        <Outlet />
      </>
    );
  }

  /* write more conditions here if you like */
  return (
    <>
      <Spinner />
      <main className="flex flex-col justify-center min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default CustomLayout;
