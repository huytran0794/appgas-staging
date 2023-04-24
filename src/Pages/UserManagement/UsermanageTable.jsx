import { Table } from "antd";

import React, { useEffect, useState } from "react";
import USER_SERVICE_FIREBASE from "../../core/services/userServ.firebase";
import UserActionButtons from "./UserActionButtons";

const UserManageTable = () => {
  const [userList, setUserList] = useState([]);
  // fetch api
  useEffect(() => {
    let getSnapShot = (snapshot) => {
      if(snapshot.exists()) {
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
        setUserList(returnedData);
      }
    };

    USER_SERVICE_FIREBASE.getUserInfoObserver(getSnapShot);
  }, []);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "username",
      className: "username font-semibold text-[#292d32] text-base",
      width: "20%",
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
      render: (_, user) => {
        return <UserActionButtons userData={user} />;
      },
    },
  ];

  return (
    <Table
      showHeader={false}
      // rowKey={(user) => user.id.toString()}
      columns={columns}
      dataSource={userList}
      pagination={false}
      className="user-manage-table"
    />
  );
};

export default UserManageTable;
