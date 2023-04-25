import React, { useEffect } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { useNavigate } from "react-router-dom";

import UserTaskTrackingTable from "./UserTaskTrackingTable";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useDispatch, useSelector } from "react-redux";
import { spinnerActions } from "../../core/redux/slice/spinnerSlice";
import { useState } from "react";
const UserTaskTrackingPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeOutId;
    dispatch(spinnerActions.setLoadingOn());
    if (LOCAL_SERVICE.user.getRole() !== "user") {
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
          sectionClass={"user-task-tracking"}
          title={"Task List"}
          content={<UserTaskTrackingTable />}
        />
      </>
    )
  );
};

export default UserTaskTrackingPage;
