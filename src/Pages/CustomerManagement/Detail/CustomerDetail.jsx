import { Avatar, Space, Tabs } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import Header from "../../../core/Components/Header/Header";
import CustomerOrderHistory from "./CustomerOrderHistory";

import avatar from "../../../core/assets/images/avatar.svg";
import { isValidUrl } from "../../../core/utils/utils";
import CUSTOMER_SERVICE_FIREBASE from "../../../core/services/customerServ.firebase";

const CustomerDetail = () => {
  const { id } = useParams();

  let [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    let returnedData = {};
    CUSTOMER_SERVICE_FIREBASE.getCustomerInfo(id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let item = snapshot.val();
          returnedData = { ...item, id: id };
          if (!item.hasOwnProperty("order_history")) {
            returnedData = { ...returnedData, order_history: [] };
          }
          setCustomerInfo(returnedData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const bgClass = "bg-white rounded-lg shadow-lg p-6";
  const renderPersonalInfo = (customerInfo) => {
    let mapCoordinate = customerInfo.map.split(",");
    let latitude = "";
    let longtitude = "";
    let mapUrl = customerInfo.map;
    if (mapCoordinate.length > 1) {
      latitude = mapCoordinate[0].trim();
      longtitude = mapCoordinate[1].trim();
      mapUrl = `https://www.google.pt/maps/dir//${latitude},${longtitude}/@${latitude},${longtitude},20z`;
    }

    return (
      <div className={clsx("personal-info", bgClass, "w-full")}>
        <div className="wrapper flex flex-col gap-2">
          <Space className="flex" direction="vertical" size={"middle"}>
            <div className="title capitalize text-lg text-[#292d32] font-bold">
              personal information
            </div>
            <div className="info w-full">
              <ul className="mb-0">
                <li className="mb-3 break-all">
                  <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                    Full name
                  </span>
                  <span className="char--special mx-1">:</span>
                  <span className="txt capitalize">
                    {customerInfo.fullname}
                  </span>
                </li>
                <li className="mb-3 break-all">
                  <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                    email
                  </span>
                  <span className="char--special mx-1">:</span>
                  <span className="txt">{customerInfo.email}</span>
                </li>
                <li className="mb-3 break-all">
                  <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                    phone
                  </span>
                  <span className="char--special mx-1">:</span>
                  <span className="txt capitalize">{customerInfo.sdt}</span>
                </li>
                <li className="mb-3 break-all">
                  <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                    Address
                  </span>
                  <span className="char--special mx-1">:</span>
                  <span className="txt capitalize">{customerInfo.address}</span>
                </li>
                <li className="mb-3 break-words block">
                  <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                    Google Map
                  </span>
                  <span className="char--special mx-1">:</span>
                  <span className="txt leading-7 inline-block break-words w-full">
                    <a href={mapUrl}>{mapUrl}</a>
                  </span>
                </li>
                <li className="mb-3 break-all">
                  <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                    Note
                  </span>
                  <span className="char--special mx-1">:</span>
                  <span className="txt leading-7">
                    {customerInfo.note.trim().length > 0
                      ? customerInfo.note
                      : "No note yet"}
                  </span>
                </li>
              </ul>
            </div>
          </Space>
        </div>
      </div>
    );
  };
  const userAvatar = (customerInfo) => {
    return (
      <>
        <div
          className={clsx(
            "user-avatar-wrapper",
            bgClass,
            "flex flex-col gap-3 items-center justify-center",
            "w-full"
          )}
        >
          <div className="avatar">
            <Avatar
              size={200}
              src={
                isValidUrl(customerInfo.avatar) ? customerInfo.avatar : avatar
              }
            />
          </div>

          <h4 className="txt text-lg font-bold text-[#292d32] mb-0">
            {customerInfo.fullname}
          </h4>
        </div>
      </>
    );
  };
  const userPersonalInfo = (customerInfo) => {
    return (
      <div className="user-info-wrapper w-full">
        <Tabs
          className=""
          defaultActiveKey="1"
          items={[
            {
              label: `Personal Information`,
              key: "1",
              children: renderPersonalInfo(customerInfo),
            },
            {
              label: `Order History`,
              key: "2",
              children: <CustomerOrderHistory customerInfo={customerInfo} />,
            },
          ]}
        />
      </div>
    );
  };
  const renderContent = (customerInfo) => {
    if (Object.keys(customerInfo).length) {
      return (
        <div className="wrapper flex flex-col items-center justify-center gap-4 font-poppins">
          {userAvatar(customerInfo)}
          {userPersonalInfo(customerInfo)}
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"customer-detail"}
        title={"Customer Details"}
        content={renderContent(customerInfo)}
      />
    </>
  );
};

export default CustomerDetail;
