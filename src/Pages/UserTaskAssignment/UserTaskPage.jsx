import React, { useEffect, useState } from "react";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import UserTaskManageTable from "./UserTaskManageTable";
import USER_SERVICE_FIREBASE from "../../core/services/userServ.firebase";
const UserTaskPage = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() === "user") {
      navigate("/");
    } else {
      let getSnapShot = (snapshot) => {
        let returnedData = [];
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
        } else {
          window.location.href = "/";
        }
      };

      USER_SERVICE_FIREBASE.getUserInfoObserver(getSnapShot);
    }
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user"}
        title={"Task Assign"}
        content={<UserTaskManageTable userListData={userList} />}
      />
    </>
  );
};

export default UserTaskPage;
