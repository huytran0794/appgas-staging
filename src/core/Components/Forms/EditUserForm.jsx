import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Label from "../../Components/Forms/Label/Label";

import USER_SERVICE_FIREBASE from "../../services/userServ.firebase";
import CustomNotification from "../Notification/CustomNotification";

import { useRef } from "react";

const EditUserForm = ({ layout = "vertical", size = "large", userInfo }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const initialValues = { ...userInfo };
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [userInfo]);

  const buttonRef = useRef(null);
  const buttonCancelRef = useRef(null);

  const handleFinish = (values) => {
    buttonRef.current.disabled = true;
    buttonCancelRef.current.disabled = true;
    let { id, newUserInfo } = userInfo;
    USER_SERVICE_FIREBASE.updateUser(id, {
      ...newUserInfo,
      ...values,
    })
      .then(() => {
        CustomNotification(
          "success",
          "Update customer ok",
          "Please wait a minute",
          "",
          Date.now()
        );

        setTimeout(() => {
          navigate("/admin/user-management");
        }, 4000);
      })
      .catch((error) => {
        console.log(error);

        buttonRef.current.disabled = false;
        buttonCancelRef.current.disabled = false;
      });
  };
  const handleFinishFailed = () => {};
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );

  return (
    <Form
      form={form}
      name="edit-user"
      layout={layout}
      size={size}
      initialValues={initialValues}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      className="edit-user-form px-4"
    >
      <Form.Item
        label={labelItem("User name")}
        name="username"
        rules={[
          { required: true, message: "Please input your name here" },
          {
            pattern:
              /^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđỲỌÁẦẢẤỜỄÀẠẰỆẾÝỘẬỐŨỨĨÕÚỮỊỖÌỀỂẨỚẶÒÙỒỢÃỤỦÍỸẮẪỰỈỎỪỶỞÓÉỬỴẲẸÈẼỔẴẺỠƠÔƯĂÊÂĐ' ]+$/,
            message: "Letters only",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={labelItem("Password")} name="password">
        <Input type="passwords" />
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
      <Form.Item className="form-btn-groups mt-7">
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
            navigate("/admin/user-management");
          }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditUserForm;
