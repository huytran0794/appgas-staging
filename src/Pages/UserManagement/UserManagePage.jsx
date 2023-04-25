import React, { useEffect } from "react";
import UserManageTable from "./UsermanageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { spinnerActions } from "../../core/redux/slice/spinnerSlice";
const UserManagePage = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeOutId;
    dispatch(spinnerActions.setLoadingOn());
    if (LOCAL_SERVICE.user.getRole() === "user") {
      timeOutId = setTimeout(() => {
        dispatch(spinnerActions.setLoadingOff());
        navigate("/");
      }, 2000);
    }

    timeOutId = setTimeout(() => {
      dispatch(spinnerActions.setLoadingOff());
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeOutId);
  }, []);

  return (
    !loading && (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"user"}
          title={"User Management"}
          content={<UserManageTable />}
        />
      </>
    )
  );
};

export default UserManagePage;
