import clsx from "clsx";
import React from "react";
import AddCustomerForm from "../../../core/Components/Forms/AddCustomerForm";

import Header from "../../../core/Components/Header/Header";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { spinnerActions } from "../../../core/redux/slice/spinnerSlice";

const AddCustomerPage = ({ customerInfo }) => {
  const bgClass = "bg-white rounded-lg shadow-lg p-2";
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeOutId;
    dispatch(spinnerActions.setLoadingOn());
    timeOutId = setTimeout(() => {
      dispatch(spinnerActions.setLoadingOff());
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeOutId);
  }, []);
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
    !loading && (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"add-customer"}
          title={"Add new customer"}
          sectionTitleClass={"mb-8"}
          content={renderPage(customerInfo)}
        />
      </>
    )
  );
};

export default AddCustomerPage;
