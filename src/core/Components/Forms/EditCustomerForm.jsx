import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Label from "../../Components/Forms/Label/Label";
import { userActions } from "../../redux/slice/userSlice";
import CUSTOMER_SERVICE_FIREBASE from "../../services/customerServ.firebase";
import CustomNotification from "../Notification/CustomNotification";

const EditCustomerForm = ({
  layout = "vertical",
  size = "large",
  customerInfo,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const initialValues = { ...customerInfo };
  const handleFinish = (values) => {
    let { id, ...customerData } = customerInfo;
    CUSTOMER_SERVICE_FIREBASE.updateCustomer(customerInfo.id, {
      ...customerData,
      ...values,
    })
      .then((res) => {
        CustomNotification("success", "Update customer ok", "Please wait a minute");
        setTimeout(() => {
          navigate("/manager");
          dispatch(userActions.setUserProfile(values));
        }, 2500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFinishFailed = () => {};
  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );
  let mapCoordinate = customerInfo.map.split(",");
  let latitude = "";
  let longtitude = "";
  let mapUrl = "";
  if (mapCoordinate.length === 2) {
    latitude = mapCoordinate[0].trim();
    longtitude = mapCoordinate[1].trim();
    mapUrl = `https://www.google.pt/maps/dir//${latitude},${longtitude}/@${latitude},${longtitude},20z`;
  }

  return (
    <Form
      form={form}
      name="edit-customer"
      layout={layout}
      size={size}
      initialValues={initialValues}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      className="edit-customer-form px-4"
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
      <div className="google-map-action">
        <Form.Item label={labelItem("Google Map")} name="map">
          <Input type="text" />
        </Form.Item>

        <div className="action">
          <a href={mapUrl ? mapUrl : "#"} target="_blank">
            <img
              src="https://templates.envytheme.com/joxi/default/assets/images/icon/maximize.svg"
              alt="map"
            />
          </a>
        </div>
      </div>

      <Form.Item label={labelItem("Note")} name="note">
        {/* <Input type="text" /> */}
        <TextArea />
      </Form.Item>

      <Form.Item className="form-btn-groups mt-7">
        <Button
          type="primary"
          htmlType="submit"
          className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
        >
          Update
        </Button>
        <Button
          htmlType="button"
          className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] text-white text-sm transition-all duration-[400ms] ml-3 rounded-md outline-none border-none"
          onClick={() => {
            navigate("/manager");
          }}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditCustomerForm;
