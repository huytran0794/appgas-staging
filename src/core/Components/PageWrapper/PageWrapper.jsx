import React from "react";
import { useLocation } from "react-router-dom";

const PageWrapper = ({ className, children }) => {
  let location = useLocation;
  const renderPage = () => {
    if (location.pathname === "/login") {
      console.log("render login page");
    }
    return <div className={className}>{children}</div>;
  };

  return renderPage();
};

export default PageWrapper;
