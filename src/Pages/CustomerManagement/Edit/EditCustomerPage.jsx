import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditCustomerForm from "../../../core/Components/Forms/EditCustomerForm";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../../core/Components/Header/Header";

import { isValidUrl, mapStringSplice } from "../../../core/utils/utils";
import avatar from "../../../core/assets/images/avatar_2.svg";
import CUSTOMER_SERVICE_FIREBASE from "../../../core/services/customerServ.firebase";
import clsx from "clsx";

const EditCustomerPage = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  let [customerInfo, setCustomerInfo] = useState({});
  const bgClass = "bg-white rounded-lg shadow-lg p-2";

  useEffect(() => {
    let getSnapShot = (snapshot) => {
      let returnedData = {};
      if (snapshot.exists()) {
        let item = snapshot.val();
        returnedData = { ...item, id: id, map: mapStringSplice(item.map) };
        returnedData.note = returnedData.note.trim();
        if (!item.hasOwnProperty("order_history")) {
          returnedData = { ...returnedData, order_history: [] };
        }
        setCustomerInfo(returnedData);
      } else {
        window.location.href = "/";
      }
    };
    CUSTOMER_SERVICE_FIREBASE.getSingleCustomerInfoObserver(getSnapShot, id);
  }, []);

  const renderPage = (customerInfo) => {
    const avatarDiv = (
      <div className="flex justify-center items-center">
        <div className="avatar">
          <Avatar
            size={200}
            src={isValidUrl(customerInfo.avatar) ? customerInfo.avatar : avatar}
          />
        </div>
      </div>
    );
    return (
      <div className={clsx("wrapper flex flex-col justify-between", bgClass)}>
        {avatarDiv}
        <div className="customer-info">
          <EditCustomerForm customerInfo={customerInfo} />
        </div>
      </div>
    );
  };

  if (Object.keys(customerInfo).length) {
    return (
      <>
        <Header />
        <SectionWrapper
          sectionClass={"edit-customer"}
          title={`Edit customer profile`}
          content={renderPage(customerInfo)}
        />
      </>
    );
  }
};

export default EditCustomerPage;
