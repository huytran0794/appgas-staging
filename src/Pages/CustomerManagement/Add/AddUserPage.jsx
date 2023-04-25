import React from "react";

import Header from "../../../core/Components/Header/Header";
import AddUserForm from "../../../core/Components/Forms/AddUserForm";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { spinnerActions } from "../../../core/redux/slice/spinnerSlice";

const AddUserPage = ({ customerInfo }) => {
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
          <AddUserForm customerInfo={customerInfo} />
        </div>
      </div>
    );
  };

  return (
    !loading && (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"add-user"}
          title={"Add new user"}
          sectionTitleClass={"mb-8"}
          content={renderPage(customerInfo)}
        />
      </>
    )
  );
};

export default AddUserPage;
