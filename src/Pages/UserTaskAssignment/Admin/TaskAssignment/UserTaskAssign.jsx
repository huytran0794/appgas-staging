import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { useParams } from "react-router-dom";

import CustomerInputForm from "../../../../core/Components/Forms/CustomerInputForm";
import SectionWrapper from "../../../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../../../core/Components/Header/Header";
import USER_SERVICE_FIREBASE from "../../../../core/services/userServ.firebase";

const UserTaskAssign = () => {
  const { id } = useParams();

  let [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let getSnapShot = (snapshot) => {
      let returnedData = {};
      if (snapshot.exists()) {
        returnedData = { ...snapshot.val(), id: snapshot.key };
        if (!snapshot.val().hasOwnProperty("tasks")) {
          returnedData = { ...returnedData, tasks: [] };
        }
        setUserInfo(returnedData);
      } else {
        window.location.href = "/";
      }
    };

    USER_SERVICE_FIREBASE.getSingleUserInfoObserver(getSnapShot, id);
  }, []);
  const bgClass = "bg-white rounded-lg p-6 shadow-xl";
  const userProfile = (userInfo) => {
    return (
      <div
        className={clsx(
          "user-profile-wrapper",
          bgClass,
          "flex flex-col gap-3 justify-center",
          "w-full"
        )}
      >
        <div className="user-profile">
          <ul className="mb-0">
            <li className="mb-3">
              <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                Full Name
              </span>
              <span className="char--special mx-1">:</span>
              <span className="txt capitalize">{userInfo.username}</span>
            </li>
            <li className="mb-3">
              <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                email
              </span>
              <span className="char--special mx-1">:</span>
              <span className="txt">{userInfo.email}</span>
            </li>
            <li className="mb-3">
              <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                phone
              </span>
              <span className="char--special mx-1">:</span>
              <span className="txt capitalize">{userInfo.sdt}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  const renderTaskForm = (userInfo) => {
    return (
      <div className={clsx("customer-input-form-wrapper", bgClass, "w-full")}>
        <CustomerInputForm userInfo={userInfo} />
      </div>
    );
  };
  const renderContent = (userInfo) => {
    return (
      <>
        <div className="wrapper flex flex-col items-center justify-center gap-4 font-poppins">
          {userProfile(userInfo)}
          {renderTaskForm(userInfo)}
        </div>
      </>
    );
  };

  if (Object.keys(userInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"assign-user"}
          title={"User Task Assignment"}
          content={renderContent(userInfo)}
        />
      </>
    );
  }
};

export default UserTaskAssign;
