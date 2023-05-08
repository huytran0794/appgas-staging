import React, { useEffect } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import AdminManageTable from "./AdminManageTable";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
const AdminManagePage = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "master") {
      navigate("/");
    }
  }, []);

  const tableHeader = (
    <div className="flex justify-between items-center">
      <h3>Admin Management</h3>
      <Button
        className="inline-flex items-center justify-center bg-indigo-500/100 p-5 mb-5 text-white text-base capitalize"
        onClick={() => navigate("/master/admin/add-admin")}
      >
        <UserAddOutlined />
        Add admin
      </Button>
    </div>
  );
  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"master"}
        title={tableHeader}
        content={<AdminManageTable />}
      />
    </>
  );
};

export default AdminManagePage;
