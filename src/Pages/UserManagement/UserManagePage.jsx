import React, { useEffect } from "react";
import UserManageTable from "./UsermanageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
const UserManagePage = () => {
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
        title={"User Management"}
        content={<UserManageTable />}
      />
    </>
  );
};

export default UserManagePage;
