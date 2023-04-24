import React from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";

import AddAdminForm from "../../core/Components/Forms/AddAdminForm";
import clsx from "clsx";
const AddAdminPage = () => {
  const bgClass = "bg-white rounded-lg shadow-lg p-2";
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
