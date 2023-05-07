import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import Label from "./Label/Label";
import MASTER_SERVICE_FIREBASE from "../../services/masterServ.firebase";
import { LOCAL_SERVICE } from "../../services/localServ";
import CustomNotification from "../Notification/CustomNotification";
import { useRef } from "react";

const EditAdminForm = ({ layout = "vertical", size = "large", adminInfo }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const initialValues = { ...adminInfo };

  const buttonRef = useRef(null);
  const buttonCancelRef = useRef(null);
  useEffect(() => {
    if (LOCAL_SERVICE.user.getRole() !== "master") {
      navigate("/");
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
    MASTER_SERVICE_FIREBASE.updateAdmin(adminInfo.id, {
      ...adminInfo,
      ...values,
    })
      .then(() => {
        CustomNotification(
          "success",
          "Update admin ok",
          "Please wait a minute",
          "",
          Date.now()
        );

        setTimeout(() => {
          navigate("/master/admin/admin-management");
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
        name="edit-admin"
        layout={layout}
        size={size}
        initialValues={initialValues}
        onFinish={handleFinish}
        className="edit-admin-form px-4"
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

        {/* <Form.Item
          label={labelItem("Password")}
          name="password"
          rules={[{ required: true, message: "Please add your password" }]}
        >
          <Input type="passwords" />
        </Form.Item> */}

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
            ref={buttonRef}
          >
            Update
          </Button>
          <Button
            htmlType="button"
            className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm transition-all duration-[400ms] ml-3 rounded-md outline-none border-none"
            ref={buttonCancelRef}
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

export default EditAdminForm;
