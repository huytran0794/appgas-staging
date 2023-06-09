import React, { useEffect } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import UserTaskManageTable from "./UserTaskManageTable";
import { spinnerActions } from "../../core/redux/slice/spinnerSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
const UserTaskPage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() === "user") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user"}
        title={"Task Assign"}
        content={<UserTaskManageTable />}
      />
    </>
  );
};

export default UserTaskPage;
