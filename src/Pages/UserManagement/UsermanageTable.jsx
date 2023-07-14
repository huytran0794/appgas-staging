import { Table } from "antd";

import React, { useEffect, useState } from "react";
import UserActionButtons from "./UserActionButtons";

const UserManageTable = ({ userListData }) => {
  const [userList, setUserList] = useState(userListData);
  console.log("userList");
  console.log(userList);
  useEffect(() => {
    setUserList(userListData);
  }, [userListData]);
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
      rowKey={(user) => user.id.toString()}
      columns={columns}
      dataSource={userList}
      pagination={false}
      className="user-manage-table manage-table"
    />
  );
};

export default UserManageTable;
