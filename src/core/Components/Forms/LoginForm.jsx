/* import antd components */
import { Button, Form, Input } from "antd";
import clsx from "clsx";

import { IoMailOutline } from "react-icons/io5";
import { HiOutlineKey } from "react-icons/hi";
import { useRef } from "react";

const LoginForm = ({ layout = "horizontal", size = "large", handleFinish }) => {
  const buttonRef = useRef(null);
  const onFinish = (values) => {
    handleFinish(values, buttonRef);
  };

  const inputClassName =
    "rounded-[10px] bg-[#F1F5FF] border border-solid border-[#F1F5FF] text-[#292d32] h-[60px] py-3 px-5";
  return (
    <Form
      name="login-form"
      className="myform loginform flex flex-col gap-2"
      onFinish={onFinish}
      layout={layout}
      size={size}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please do not leave ${name} empty",
          },
          {
            type: "email",
            message: "Please input correct email format for ${name}",
          },
        ]}
      >
        <Input
          prefix={
            <IoMailOutline
              className="site-form-item-icon text-blue-ribbon-500"
              size={"24px"}
            />
          }
          placeholder="Email"
          className={clsx(inputClassName)}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          name="password"
          prefix={
            <HiOutlineKey
              className="site-form-item-icon text-blue-ribbon-500"
              size={"24px"}
            />
          }
          type="password"
          placeholder="Password"
          className={clsx(inputClassName)}
        />
      </Form.Item>
      {/* <div className="form-item-wrapper mb-6">
        <Link to="" className="text-blue-ribbon-500">
          Forgot Password?
        </Link>
      </div> */}
      <Form.Item className="w-full mb-6">
        <Button
          htmlType="submit"
          className={clsx(
            "login-form-button w-full bg-blue-ribbon-500 rounded-xl hover:bg-[#4fcb8d]",
            "font-semibold text-lg",
            "p-3 rounded-md",
            "text-white flex items-center justify-center",
            "duration-500 transition-all",
            "outline-none border-none"
          )}
          ref={buttonRef}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
