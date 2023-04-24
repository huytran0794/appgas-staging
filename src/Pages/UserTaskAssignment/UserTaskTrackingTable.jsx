import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import USER_SERVICE_FIREBASE from "../../core/services/userServ.firebase";
import UserTaskTrackingActionButtons from "./UserTaskTrackingActionButtons";

const UserTaskTrackingTable = () => {
  let currentUserInfo = LOCAL_SERVICE.user.get();

  const [taskList, setTaskList] = useState([]);
  // fetch api
  useEffect(() => {
    let getSnapShot = (snapshot) => {
      console.log('run lay customer ne')
      if (snapshot.exists()) {
        let returnedData = "";
        if(snapshot.val().hasOwnProperty('tasks')) {
          returnedData = snapshot.val().tasks.filter((task) => task.completed == false);
          setTaskList([...returnedData]);
        }
      }
    };

    USER_SERVICE_FIREBASE.getSingleUserInfoObserver(currentUserInfo.id, getSnapShot)
  }, []);

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
