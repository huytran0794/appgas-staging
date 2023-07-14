import { Table } from "antd";

import React, { useEffect, useState } from "react";
// import UserActionButtons from "./UserActionButtons";

import AdminActionButtons from "./AdminActionButtons";

const AdminManageTable = ({ adminListData }) => {
  const [adminList, setAdminList] = useState([...adminListData]);
  useEffect(() => {
    setAdminList([...adminListData]);
  }, [adminListData]);
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      className:
        "fullname admin-full-name font-semibold text-[#292d32] text-base",
      // width: "30%",
    },
    {
      title: "Phone",
      dataIndex: "sdt",
      className: "sdt text-[#292d32] text-base",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, admin) => {
        return <AdminActionButtons adminData={admin} />;
      },
    },
  ];

  return (
    <Table
      showHeader={false}
      rowKey={(admin) => admin.id.toString()}
      columns={columns}
      dataSource={adminList}
      pagination={false}
      className="admin-manage-table manage-table"
    />
  );
};

export default AdminManageTable;
