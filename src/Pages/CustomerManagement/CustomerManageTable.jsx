import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerAvatarInfo from "../../core/Components/TableAvatar/CustomerAvatarInfo";
import CustomerActionButtons from "./CustomerActionButtons";

const CustomerManageTable = ({ search, customerListData }) => {
  const [customerList, setCustomerList] = useState(customerListData);
  let location = useLocation();
  useEffect(() => {
    let returnedData = [...customerListData];
    if (search) {
      if (/^\d+$/.test(search)) {
        returnedData = customerList.filter(
          (customer) => customer.sdt.indexOf(search) > -1
        );
      } else {
        returnedData = customerList.filter(
          (customer) => customer.fullname.toLowerCase().indexOf(search) > -1
        );
      }
    }
    setCustomerList(returnedData);
  }, [search]);

  useEffect(() => {
    setCustomerList(customerListData);
  }, [customerListData]);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      className: "fullname",
      render: (_, customer) => <CustomerAvatarInfo customerData={customer} />,
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, customer) => {
        if (location.pathname === "/manager") {
          return <CustomerActionButtons customerData={customer} />;
        } else {
          return (
            <a href={`tel:${customer.sdt}`}>
              <img
                src="https://templates.envytheme.com/joxi/default/assets/images/icon/call-2.svg"
                alt=""
              />
            </a>
          );
        }
      },
    },
  ];
  return (
    <Table
      showHeader={false}
      rowKey={(customer) => customer.id.toString()}
      columns={columns}
      dataSource={customerList}
      pagination={false}
      className="customer-manage-table"
    />
  );
};

export default CustomerManageTable;
