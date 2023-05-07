import { Table } from "antd";

import React, { useEffect, useState } from "react";
import MASTER_SERVICE_FIREBASE from "../../core/services/masterServ.firebase";
// import UserActionButtons from "./UserActionButtons";

import AdminActionButtons from "./AdminActionButtons";

const AdminManageTable = () => {
  const [adminList, setAdminList] = useState([]);
  // fetch api
  useEffect(() => {
    let getSnapShot = (snapshot) => {
      if (snapshot.exists()) {
        let returnedData = [];
        snapshot.forEach((item) => {
          returnedData = [
            ...returnedData,
            {
              key: item.key,
              ...item.val(),
              id: item.key,
            },
          ];
        });
        setAdminList(returnedData);
      }
    };

    MASTER_SERVICE_FIREBASE.getAdminInfoObserver(getSnapShot);
  }, []);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      className: "fullname admin-full-name font-semibold text-[#292d32] text-base",
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
      // rowKey={(user) => user.id.toString()}
      columns={columns}
      dataSource={adminList}
      pagination={false}
      className="admin-manage-table manage-table"
    />
  );
};

export default AdminManageTable;
