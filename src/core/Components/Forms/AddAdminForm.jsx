import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import Label from "./Label/Label";
import MASTER_SERVICE_FIREBASE from "../../services/masterServ.firebase";
import { LOCAL_SERVICE } from "../../services/localServ";
import CustomNotification from "../Notification/CustomNotification";
import { useDispatch } from "react-redux";
import { spinnerActions } from "../../redux/slice/spinnerSlice";
import { useRef } from "react";

const AddAdminForm = ({ layout = "vertical", size = "large" }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [adminId, setAdminId] = useState();
  const dispatch = useDispatch();
  const buttonRef = useRef(null);
  const buttonCancelRef = useRef(null);
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "master") {
      navigate("/");
    } else {
      MASTER_SERVICE_FIREBASE.getLastDataRef("/admin")
        .then((snapshot) => {
          if (snapshot.exists()) {
            snapshot.forEach((item) => {
              setAdminId(parseInt(item.key) + 1);
            });
          }
        })
        .catch((error) => {
          console.log("error");
          console.log(error);
        });
    }
  }, []);

  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );
  const handleFinish = (values) => {
    buttonRef.current.disabled = true;
    buttonCancelRef.current.disabled = true;
    dispatch(spinnerActions.setLoadingOn());
    MASTER_SERVICE_FIREBASE.addAdminInfo(adminId, values)
      .then(() => {
        setTimeout(() => {
          CustomNotification(
            "success",
            "Add new admin ok",
            "Please wait a minute",
            "",
            Date.now()
          );
          dispatch(spinnerActions.setLoadingOff());
        }, 2000);

        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        console.log(error);

        buttonRef.current.disabled = false;
        buttonCancelRef.current.disabled = false;
      });
  };

  const renderAddForm = () => {
    return (
      <Form
        form={form}
        name="add-admin"
        layout={layout}
        size={size}
        onFinish={handleFinish}
        className="add-admin-form px-4"
      >
        <Form.Item
          label={labelItem("Full name")}
          name="fullname"
          rules={[
            { required: true, message: "Please input your name here" },
            {
              message: "Letters only",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={labelItem("Email")}
          name="email"
          rules={[
            { required: true, message: "Please add your email here" },
            {
              type: "email",
              message: "Please use correct email format",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={labelItem("Password")}
          name="password"
          rules={[{ required: true, message: "Please add your password" }]}
        >
          <Input type="passwords" />
        </Form.Item>

        <Form.Item
          label={labelItem("Phone number")}
          name="sdt"
          rules={[
            { required: true, message: "Phone number is required" },
            {
              pattern: /^\d+$/,
              message: "Number only, no whitespace",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="form-btn-groups" style={{ marginTop: "30px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
          >
            Add new admin
          </Button>
          <Button
            htmlType="button"
            className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm transition-all duration-[400ms] ml-3 rounded-md outline-none border-none"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return renderAddForm();
};

export default AddAdminForm;
