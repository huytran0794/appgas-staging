import React, { useEffect, useState } from "react";
import CustomerManageTable from "./CustomerManageTable";
import SectionWrapper from "../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../core/Components/Header/Header";
import CUSTOMER_SERVICE_FIREBASE from "../../core/services/customerServ.firebase";
const CustomerManagementPage = () => {
  const [search, setSearch] = useState("");
  let handleSearchInput = (searchTxt) => {
    setSearch(searchTxt);
  };
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
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

      setCustomerList(returnedData);
    };
    CUSTOMER_SERVICE_FIREBASE.getCustomerInfoObserver(getSnapShot);
  }, []);

 

  if (customerList.length) {
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
