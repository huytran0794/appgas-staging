import React, { useEffect } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import AdminManageTable from "./AdminManageTable";
const AdminManagePage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "master") {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"master"}
        title={"Admin Management"}
        content={<AdminManageTable />}
      />
    </>
  );
};

export default AdminManagePage;
