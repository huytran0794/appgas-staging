import React from "react";

import Header from "../../../core/Components/Header/Header";
import AddUserForm from "../../../core/Components/Forms/AddUserForm";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import clsx from "clsx";

const AddUserPage = ({ customerInfo }) => {
  const bgClass = "bg-white rounded-lg shadow-lg p-2";
  const renderPage = (customerInfo) => {
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        <div className="w-full">
          <AddUserForm customerInfo={customerInfo} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"add-user"}
        title={"Add new user"}
        sectionTitleClass={"mb-8"}
        content={renderPage(customerInfo)}
      />
    </>
  );
};

export default AddUserPage;
