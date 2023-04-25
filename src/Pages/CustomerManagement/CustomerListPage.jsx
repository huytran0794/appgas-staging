import React, { useEffect, useState } from "react";
import CustomerManageTable from "./CustomerManageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MdOutlineManageAccounts } from "react-icons/md";
import { RiFileExcel2Line } from "react-icons/ri";
import { LOCAL_SERVICE } from "../../core/services/localServ";

import { storage } from "../../core/services/configFirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { exportToExcel } from "../../core/Components/ExcelReport/exportExcel";
import { sendMailWithFile } from "../../core/Components/Email/sendMail";
import CustomNotification from "../../core/Components/Notification/CustomNotification";
import CUSTOMER_SERVICE_FIREBASE from "../../core/services/customerServ.firebase";
import { useDispatch } from "react-redux";
import { spinnerActions } from "../../core/redux/slice/spinnerSlice";

const CustomerListPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spinnerActions.setLoadingOn());
    let timeOutId;
    let returnedData = [];
    CUSTOMER_SERVICE_FIREBASE.getCustomerList()
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((item) => {
            returnedData = [
              ...returnedData,
              {
                ...item.val(),
                id: item.key,
              },
            ];
          });
          timeOutId = setTimeout(() => {
            dispatch(spinnerActions.setLoadingOff());
            setLoading(false);
            setCustomerList(returnedData);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => clearTimeout(timeOutId);
  }, []);

  let handleSearchInput = (searchTxt) => {
    setSearch(searchTxt);
  };

  let handleExportFile = (customerList) => {
    dispatch(spinnerActions.setLoadingOn());
    const fileName = "file_report";
    const currentDate = new Date().getTime();

    let fileBlobData = exportToExcel(
      `${fileName}_${currentDate}`,
      customerList
    );

    const fileRef = ref(storage, `files/${fileName}_${currentDate}.xlsx`);
    uploadBytes(fileRef, fileBlobData)
      .then((snapshot) => {
        CustomNotification(
          "info",
          "Exporting data",
          "Please wait a minute",
          "",
          Date.now()
        );
        return getDownloadURL(fileRef);
      })
      .then((url) => {
        let templateParams = {
          from_name: "system",
          message: `<p>Link download: <a href="${url}" download>Link</a></p>`,
          to_email: LOCAL_SERVICE.user.get().email,
          // to_email: "kuum94@gmail.com",
        };
        return sendMailWithFile(templateParams);
      })
      .then((result) => {
        setTimeout(() => {
          dispatch(spinnerActions.setLoadingOff());
          setLoading(false);
        }, 2000);
        CustomNotification(
          "success",
          "Email is sent",
          "Please check your inbox",
          "",
          Date.now()
        );
      })
      .catch((error) => {
        CustomNotification(
          "error",
          "Error",
          "Something went wrong",
          "",
          Date.now()
        );
        console.log(error);
      });
  };

  let renderTitle = () => {
    return (
      <div className="wrapper">
        <p>Customer List</p>

        <div className="button-group">
          <Button
            className="flex items-center justify-center bg-indigo-500/100 p-5 w-full mb-5"
            onClick={() => {
              navigate("/manager");
            }}
          >
            <MdOutlineManageAccounts color="#fff" size={28} />
          </Button>

          {LOCAL_SERVICE.user.getRole() === "master" && (
            <Button
              className="flex items-center justify-center bg-indigo-500/100 p-5 w-full mb-5"
              onClick={() => handleExportFile(customerList)}
            >
              <RiFileExcel2Line color="#fff" size={24} />
            </Button>
          )}
        </div>
      </div>
    );
  };
  if (customerList.length && !loading) {
    return (
      <>
        <Header handleSearchInput={handleSearchInput} />
        <SectionWrapper
          sectionClass={"customers"}
          title={renderTitle()}
          titleClass="flex items-center justify-center"
          content={
            <CustomerManageTable
              search={search}
              customerListData={customerList}
            />
          }
        />
      </>
    );
  }
};

export default CustomerListPage;
