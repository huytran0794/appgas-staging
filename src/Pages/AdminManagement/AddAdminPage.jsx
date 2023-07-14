import React from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";

import AddAdminForm from "../../core/Components/Forms/AddAdminForm";
import clsx from "clsx";
import { useEffect } from "react";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";

const AddAdminPage = () => {
  const navigate = useNavigate();
  const bgClass = "bg-white rounded-lg shadow-lg p-2";
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "master") {
      navigate("/");
    }
  }, []);
  const renderPage = () => {
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        <div className="w-full">
          <AddAdminForm />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"master"}
        title={"Add new admin"}
        content={renderPage()}
      />
    </>
  );
};

export default AddAdminPage;
