import React from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";

import AddAdminForm from "../../core/Components/Forms/AddAdminForm";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { spinnerActions } from "../../core/redux/slice/spinnerSlice";
import { useState } from "react";
import { useRef } from "react";
const AddAdminPage = () => {
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
    !loading && (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"master"}
          title={"Add new admin"}
          content={renderPage()}
        />
      </>
    )
  );
};

export default AddAdminPage;
