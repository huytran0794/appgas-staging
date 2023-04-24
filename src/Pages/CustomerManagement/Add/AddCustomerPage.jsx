import clsx from "clsx";
import React from "react";
import AddCustomerForm from "../../../core/Components/Forms/AddCustomerForm";

import Header from "../../../core/Components/Header/Header";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

const AddCustomerPage = ({ customerInfo }) => {
  const bgClass = "bg-white rounded-lg shadow-lg p-2";
  const renderPage = (customerInfo) => {
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        <div className="w-full">
          <AddCustomerForm customerInfo={customerInfo} />
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"add-customer"}
        title={"Add new customer"}
        sectionTitleClass={"mb-8"}
        content={renderPage(customerInfo)}
      />
    </>
  );
};

export default AddCustomerPage;
