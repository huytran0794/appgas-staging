import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Label from "../../../../src/core/Components/Forms/Label/Label";
import CustomNotification from "../Notification/CustomNotification";
import TextArea from "antd/es/input/TextArea";
import CUSTOMER_SERVICE_FIREBASE from "../../../core/services/customerServ.firebase";
import { useRef } from "react";
import { mapStringSplice } from "../../utils/utils";
const AddCustomerForm = ({
  layout = "vertical",
  size = "large",
  customerInfo,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const initialValues = { ...customerInfo };
  const [customerId, setCustomerId] = useState(0);

  const buttonRef = useRef(null);
  const buttonCancelRef = useRef(null);

  useEffect(() => {
    CUSTOMER_SERVICE_FIREBASE.getLastDataRef("/customers")
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((item) => {
            setCustomerId(parseInt(item.key) + 1);
          });
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  }, []);

  const handleFinish = (values) => {
    buttonRef.current.disabled = true;
    buttonCancelRef.current.disabled = true;
    values = { ...values, map: mapStringSplice(values.map), order_history: [] };

    if (!values.note) {
      values.note = "";
    }
    CUSTOMER_SERVICE_FIREBASE.addCustomer(customerId, values)
      .then(() => {
        CustomNotification(
          "success",
          "Add new customer ok",
          "Please wait a minute",
          "",
          Date.now()
        );
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);

        buttonRef.current.disabled = false;
        buttonCancelRef.current.disabled = false;
      });
  };
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );
  const addForm = () => {
    return (
      <Form
        form={form}
        name="add-customer"
        layout={layout}
        size={size}
        initialValues={initialValues}
        onFinish={handleFinish}
        className="add-customer-form px-4"
      >
        <Form.Item
          label={labelItem("full name")}
          name="fullname"
          rules={[
            { required: true, message: "Please input your Name here" },
            {
              pattern:
                /^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđỲỌÁẦẢẤỜỄÀẠẰỆẾÝỘẬỐŨỨĨÕÚỮỊỖÌỀỂẨỚẶÒÙỒỢÃỤỦÍỸẮẪỰỈỎỪỶỞÓÉỬỴẲẸÈẼỔẴẺỠƠÔƯĂÊÂĐ' ]+$/,
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
        <Form.Item label={labelItem("Address")} name="address">
          <Input />
        </Form.Item>

        <Form.Item
          label={labelItem("Google Map")}
          name="map"
          rules={[
            { required: true, message: "Please input your map here" },
            {
              message: "Letters only",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={labelItem("Note")} name="note">
          <TextArea />
        </Form.Item>
        <Form.Item className="form-btn-groups" style={{ marginTop: "30px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
            ref={buttonRef}
          >
            Add new
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

  return addForm();
};

export default AddCustomerForm;
