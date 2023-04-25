import React, { useEffect, useState } from "react";
import CustomerManageTable from "./CustomerManageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import CUSTOMER_SERVICE_FIREBASE from "../../core/services/customerServ.firebase";
import { useDispatch } from "react-redux";
import { spinnerActions } from "../../core/redux/slice/spinnerSlice";
const CustomerManagementPage = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let handleSearchInput = (searchTxt) => {
    setSearch(searchTxt);
  };
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    dispatch(spinnerActions.setLoadingOn());
    let getSnapShot = (snapshot) => {
      let returnedData = [];
      snapshot.forEach((item) => {
        returnedData = [
          ...returnedData,
          {
            ...item.val(),
            id: item.key,
          },
        ];
      });
      setTimeout(() => {
        dispatch(spinnerActions.setLoadingOff());
        setLoading(false);
        setCustomerList(returnedData);
      }, 2000);
    };
    CUSTOMER_SERVICE_FIREBASE.getCustomerInfoObserver(getSnapShot);
  }, []);

  if (customerList.length && !loading) {
    return (
      <>
        <Header handleSearchInput={handleSearchInput} />
        <SectionWrapper
          sectionClass={"customers"}
          title={"Customer Management"}
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

export default CustomerManagementPage;
