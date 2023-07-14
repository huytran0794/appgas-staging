import React, { useEffect } from "react";
import Header from "../../../core/Components/Header/Header";
import TaskDetailForm from "../../../core/Components/Forms/TaskDetailForm";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import USER_SERVICE_FIREBASE from "../../../core/services/userServ.firebase";
import { LOCAL_SERVICE } from "../../../core/services/localServ";
import clsx from "clsx";

const UserTaskDetail = () => {
  const { id } = useParams();
  let [taskInfo, setTaskInfo] = useState({});
  let userInfo = LOCAL_SERVICE.user.get();
  const bgClass = "bg-white rounded-lg shadow-lg p-2";
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.role !== "user") {
      navigate("/");
    } else {
      let getSnapShot = (snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().hasOwnProperty("tasks")) {
            userInfo.tasks = [...snapshot.val().tasks];
            LOCAL_SERVICE.user.set(userInfo, userInfo.role);
            let taskIdx = snapshot
              .val()
              .tasks.findIndex((task) => task.id === id);
            if (taskIdx > -1) {
              setTaskInfo({ ...snapshot.val().tasks[taskIdx] });
            }
          } else {
            userInfo.tasks = [];
          }
        } else {
          window.location.href = "/";
        }
      };

      USER_SERVICE_FIREBASE.getSingleUserInfoObserver(getSnapShot, userInfo.id);
    }
  }, [location.pathname, id]);

  const renderPage = (taskInfo) => {
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        <div className="w-full">
          <TaskDetailForm taskInfo={taskInfo} userInfo={userInfo} />
        </div>
      </div>
    );
  };

  if (Object.keys(taskInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"user-task-detail"}
          title={`Task Detail`}
          content={renderPage(taskInfo)}
        />
      </>
    );
  }
};

export default UserTaskDetail;
