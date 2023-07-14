import React, { useEffect, useState } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { useNavigate } from "react-router-dom";

import UserTaskTrackingTable from "./UserTaskTrackingTable";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import USER_SERVICE_FIREBASE from "../../core/services/userServ.firebase";

const UserTaskTrackingPage = () => {
  let navigate = useNavigate();
  let currentUserInfo = LOCAL_SERVICE.user.get();

  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "user") {
      navigate("/");
    }
    let getSnapShot = (snapshot) => {
      if (snapshot.exists()) {
        let returnedData = "";
        if (snapshot.val().hasOwnProperty("tasks")) {
          returnedData = snapshot
            .val()
            .tasks.filter((task) => task.completed == false);
          setTaskList([...returnedData]);
        }
      } else {
        window.location.href = "/";
      }
    };

    USER_SERVICE_FIREBASE.getSingleUserInfoObserver(
      getSnapShot,
      currentUserInfo.id
    );
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user-task-tracking"}
        title={"Task List"}
        content={<UserTaskTrackingTable taskListData={taskList} />}
      />
    </>
  );
};

export default UserTaskTrackingPage;
