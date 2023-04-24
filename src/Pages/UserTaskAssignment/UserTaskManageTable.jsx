import { Table } from "antd";
import React, { useEffect, useState } from "react";
import USER_SERVICE_FIREBASE from "../../core/services/userServ.firebase";

import UserActionButtons from "./UserTaskActionButtons";

const UserTaskManageTable = () => {
  const [userList, setUserList] = useState([]);
  // fetch api
  useEffect(() => {
    let returnedData = [];
    USER_SERVICE_FIREBASE.getUserInfo()
      .then((snapshot) => {
        if (snapshot.exists()) {
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
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "User Name",
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

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Table
      showHeader={false}
      rowKey={(user) => user.id.toString()}
      columns={columns}
      dataSource={userList}
      pagination={false}
      className="user-task-manage-table"
    />
  );
};

export default UserTaskManageTable;
