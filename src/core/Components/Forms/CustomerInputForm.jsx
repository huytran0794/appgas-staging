import { Button, Form, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../Components/Forms/Label/Label";
import CustomNotification from "../Notification/CustomNotification";
import { nanoid } from "@reduxjs/toolkit";
import CUSTOMER_SERVICE_FIREBASE from "../../services/customerServ.firebase";
import USER_SERVICE_FIREBASE from "../../services/userServ.firebase";
import { sendMailWithTasks } from "../Email/sendMail";
import { mapStringSplice } from "../../utils/utils";

const { Option } = Select;

const CustomerInputForm = ({
  layout = "vertical",
  size = "large",
  userInfo,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [customerList, setCustomerList] = useState([]);
  const buttonRef = useRef(null);
  const buttonCancelRef = useRef(null);

  useEffect(() => {
    let getSnapShot = (snapshot) => {
      let returnedData = [];
      if (snapshot.exists()) {
        snapshot.forEach((item) => {
          returnedData = [
            ...returnedData,
            {
              key: item.key,
              ...item.val(),
              id: item.key,
            },
          ];
        });
        setCustomerList(returnedData);
      }
    };
    CUSTOMER_SERVICE_FIREBASE.getCustomerInfoObserver(getSnapShot);
  }, []);

  const handleFinish = (values) => {
    console.log("values from form");
    console.log(values);

    let customerIdx = customerList.findIndex(
      (customer) => customer.sdt === values.sdt
    );

    if (customerIdx > -1) {
      let taskData = {
        id: nanoid(5),
        customer_id: customerList[customerIdx].id,
        fullname: customerList[customerIdx].fullname,
        email: customerList[customerIdx].email,
        sdt: customerList[customerIdx].sdt,
        map: mapStringSplice(customerList[customerIdx].map),
        address: customerList[customerIdx].address,
        order: values.order.trim() || "",
        note: values.note || "",
        completed: false,
      };
      userInfo.tasks = [...userInfo.tasks, taskData];
      let { id, ...userData } = userInfo;
      buttonRef.current.disabled = true;
      buttonCancelRef.current.disabled = true;
      USER_SERVICE_FIREBASE.updateUser(id, { ...userData })
        .then(() => {
          let templateParams = {
            order: taskData.order,
            from_name: "system",
            message: `
              Khách hàng: ${taskData.fullname},
              SĐT: ${taskData.sdt},
              Địa chỉ: ${taskData.address},
              Google map: ${taskData.map},
            `,
            button_html: `<p></p>`,
            to_email: userInfo.email,
            // to_email: "kuum94@gmail.com",
          };

          return sendMailWithTasks(templateParams);
        })
        .then((res) => {
          if (res.status === 200) {
            CustomNotification(
              "success",
              "Assign task for user ok",
              "Please wait a minute",
              "",
              Date.now()
            );
            setTimeout(() => {
              navigate("/admin/user/task-management");
            }, 3000);
          } else {
            CustomNotification(
              "error",
              "Something went wrong !!",
              "Please check your email again!!",
              "",
              Date.now()
            );
            throw new Error("Fail");
          }
        })
        .catch((error) => {
          buttonRef.current.disabled = false;
          buttonCancelRef.current.disabled = false;
          console.log(error);
        });
    } else {
      CustomNotification(
        "error",
        "Customer phone number does not exist",
        "",
        Date.now()
      );
    }
  };
  const handleFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );

  return (
    <Form
      form={form}
      name="order-customer"
      layout={layout}
      size={size}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      className="order-customer-form px-4"
    >
      <Form.Item
        label={labelItem("Phone number")}
        name="sdt"
        rules={[
          { required: true, message: "Phone number is required" },
          {
            pattern: /^\d+$/,
            message: "Phone number must be number only, no whitespace",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Search customer phone number"
          optionFilterProp=""
          optionLabelProp="label"
          filterOption={(input, option) => {
            return (
              (option?.value ?? "").includes(input) ||
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            );
          }}
          listItemHeight={35}
          listHeight={200}
        >
          {customerList.map((item, idx) => {
            return (
              <Option
                value={item.sdt}
                label={item.fullname}
                key={Math.random().toString() + idx}
              >
                <div className="flex flex-col justify-center align-middle">
                  <span className="customer-name text-base font-semibold">
                    {item.fullname}
                  </span>
                  <span className="phone">{item.sdt}</span>
                </div>
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label={labelItem("Order")}
        name="order"
        rules={[{ required: true, message: "Order is required" }]}
      >
        <TextArea placeholder="Order info: " />
      </Form.Item>
      <Form.Item label={labelItem("Note")} name="note">
        <TextArea placeholder="Note(s):" />
      </Form.Item>
      <Form.Item className="form-btn-groups">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
          ref={buttonRef}
        >
          Assign
        </Button>
        <Button
          htmlType="button"
          className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm transition-all duration-[400ms] ml-3 rounded-md outline-none border-none"
          onClick={() => {
            navigate("/");
          }}
          ref={buttonCancelRef}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomerInputForm;
