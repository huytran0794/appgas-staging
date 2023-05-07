import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import Header from "../../../core/Components/Header/Header";

import avatar from "../../../core/assets/images/avatar.svg";
import clsx from "clsx";
import EditAdminForm from "../../../core/Components/Forms/EditAdminForm";
import MASTER_SERVICE_FIREBASE from "../../../core/services/masterServ.firebase";

const EditAdminPage = () => {
  const { id } = useParams();

  let [adminInfo, setAdminInfo] = useState({});
  const bgClass = "bg-white rounded-lg shadow-lg p-2";

  useEffect(() => {
    MASTER_SERVICE_FIREBASE.getSingleAdminInfo(id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot);
          setAdminInfo({ ...snapshot.val(), id: snapshot.key });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPage = (adminInfo) => {
    const avatarDiv = (
      <div className="p-[20px] flex justify-center items-center w-full">
        <div className="avatar admin-avatar">
          <Avatar size={300} src={avatar} />
        </div>
      </div>
    );
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        {avatarDiv}
        <div className="w-full">
          <EditAdminForm adminInfo={adminInfo} />
        </div>
      </div>
    );
  };

  if (Object.keys(adminInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"edit-admin"}
          title={`Edit admin profile`}
          content={renderPage(adminInfo)}
        />
      </>
    );
  }
};

export default EditAdminPage;
