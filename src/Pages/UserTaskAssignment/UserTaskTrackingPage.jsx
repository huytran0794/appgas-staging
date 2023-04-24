import React, { useEffect } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { useNavigate } from "react-router-dom";

import UserTaskTrackingTable from "./UserTaskTrackingTable";
import { LOCAL_SERVICE } from "../../core/services/localServ";
const UserTaskTrackingPage = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "user") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user-task-tracking"}
        title={"Task List"}
        content={<UserTaskTrackingTable />}
      />
    </>
  );
};

export default UserTaskTrackingPage;
