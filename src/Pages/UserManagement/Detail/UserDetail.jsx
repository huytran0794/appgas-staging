import { Avatar, Space } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import Header from "../../../core/Components/Header/Header";
import avatar from "../../../core/assets/images/avatar.svg";
import USER_SERVICE_FIREBASE from "../../../core/services/userServ.firebase";

const UserDetail = () => {
  const { id } = useParams();
  let [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    USER_SERVICE_FIREBASE.getSingleUserInfo(id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserInfo(snapshot.val());
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const bgClass = "bg-white rounded-lg shadow-lg p-6";
  const userAvatar = (userInfo) => {
    return (
      <>
        <div
          className={clsx(
            "user-avatar-wrapper",
            bgClass,
            "flex flex-col items-center justify-center gap-3",
            "w-full"
          )}
        >
          <div className="flex justify-center items-center w-full">
            <div className="avatar">
              <Avatar
                size={200}
                src={userInfo?.avatar ? userInfo.avatar : avatar}
              />
            </div>
          </div>

          <h4 className="txt text-lg font-bold text-[#292d32] mb-0">
            {userInfo.username}
          </h4>
          <span>Member since: September 2022</span>
        </div>
      </>
    );
  };
  const userPersonalInfo = (userInfo) => {
    return (
      <div className={clsx("user-info-wrapper", bgClass, "w-full")}>
        <Space className="flex" direction="vertical" size={"middle"}>
          <div className="title capitalize text-lg text-[#292d32] font-bold">
            personal information
          </div>
          <div className="info w-full">
            <ul className="mb-0">
              <li className="mb-3">
                <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                  Họ Tên
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
        </Space>
      </div>
    );
  };
  const renderContent = (userInfo) => {
    if (Object.keys(userInfo).length) {
      return (
        <div className="wrapper flex flex-col items-center justify-center gap-4 font-poppins">
          {userAvatar(userInfo)}
          {userPersonalInfo(userInfo)}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"user-detail"}
        title={"User detail"}
        content={renderContent(userInfo)}
      />
    </>
  );
};

export default UserDetail;
