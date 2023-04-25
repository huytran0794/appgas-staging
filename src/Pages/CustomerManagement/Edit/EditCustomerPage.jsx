import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditCustomerForm from "../../../core/Components/Forms/EditCustomerForm";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../../core/Components/Header/Header";

import { isValidUrl } from "../../../core/utils/utils";
import avatar from "../../../core/assets/images/avatar_2.svg";
import CUSTOMER_SERVICE_FIREBASE from "../../../core/services/customerServ.firebase";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { spinnerActions } from "../../../core/redux/slice/spinnerSlice";

const EditCustomerPage = () => {
  const { id } = useParams();
  let [customerInfo, setCustomerInfo] = useState({});
  const bgClass = "bg-white rounded-lg shadow-lg p-2";

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timeOutId;
    dispatch(spinnerActions.setLoadingOn());
    let returnedData = {};
    CUSTOMER_SERVICE_FIREBASE.getCustomerInfo(id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let item = snapshot.val();
          returnedData = { ...item, id: id };
          if (!item.hasOwnProperty("order_history")) {
            returnedData = { ...returnedData, order_history: [] };
            returnedData.note = returnedData.note.trim();
          }
          setCustomerInfo(returnedData);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("running trong finally");
        timeOutId = setTimeout(() => {
          dispatch(spinnerActions.setLoadingOff());
          setLoading(false);
        }, 2000);
      });

    return () => clearTimeout(timeOutId);
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

  if (Object.keys(customerInfo).length && !loading) {
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
