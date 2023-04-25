import clsx from "clsx";
import React from "react";

import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
/* import packages */

export default function Spinner() {
  let isLoading = useSelector((state) => state.spinnerReducer.isLoading);
  const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;
  const loadingClass = isLoading
    ? "opacity-100 visible "
    : "opacity-0 invisible";

  return (
    <div
      className={clsx(
        "spinner",
        "fixed left-0 top-0 bg-[#282c34] flex justify-center items-center z-[9999]",
        "h-screen w-screen",
        loadingClass,
        "transition-all duration-[1200ms]"
      )}
    >
      <Spin indicator={antIcon} />
    </div>
  );
}
