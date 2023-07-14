import { Table } from "antd";
import React, { useEffect, useState } from "react";

import USER_SERVICE_FIREBASE from "../../core/services/userServ.firebase";
import UserTaskTrackingActionButtons from "./UserTaskTrackingActionButtons";

const UserTaskTrackingTable = ({ taskListData }) => {
  const [taskList, setTaskList] = useState(taskListData);
  useEffect(() => {
    setTaskList(taskListData);
  }, [taskListData]);
  const columns = [
    {
      title: "Customer Name",
      dataIndex: "fullname",
      className: "order-number text-[#292d32] text-base",
    },
    {
      title: "Customer Phone",
      dataIndex: "sdt",
      className: "order-number text-[#292d32] text-base",
    },
    {
      title: "Action",
      dataIndex: "",
      className: "action-btn-group",
      key: "x",
      width: "15%",
      render: (_, task) => {
        return <UserTaskTrackingActionButtons taskData={task} />;
      },
    },
  ];

  return (
    <Table
      showHeader={false}
      rowKey={(task) => task.id.toString()}
      columns={columns}
      dataSource={taskList}
      pagination={true}
      className="user-task-tracking-table"
    />
  );
};

export default UserTaskTrackingTable;
