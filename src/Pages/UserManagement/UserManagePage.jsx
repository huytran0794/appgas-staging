import React, { useEffect, useState } from "react";
import UserManageTable from "./UsermanageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { LOCAL_SERVICE } from "../../core/services/localServ";
import { useNavigate } from "react-router-dom";
import USER_SERVICE_FIREBASE from "../../core/services/userServ.firebase";
const UserManagePage = () => {
  let navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() === "user") {
      navigate("/");
    }
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
      }
    };

    USER_SERVICE_FIREBASE.getUserInfoObserver(getSnapShot);
  }, []);

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user"}
        title={"User Management"}
        content={<UserManageTable userListData={userList} />}
      />
    </>
  );
};

export default UserManagePage;
