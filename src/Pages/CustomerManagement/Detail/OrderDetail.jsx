import { Space } from "antd";
import clsx from "clsx";
import React from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";
import Header from "../../../core/Components/Header/Header";

const OrderDetail = () => {
  // const { customer_id, id } = useParams();
  const bgClass = "bg-white rounded-lg p-4 shadow-lg py-[30px] px-[20px]";
  const renderOrderDetail = (order) => {
    return (
      <div className={clsx("content-body", bgClass, "w-full")}>
        <div className="wrapper flex flex-col gap-2">
          <div className="personal-info">
            <Space className="flex" direction="vertical" size={"middle"}>
              <div className="title capitalize text-lg text-[#292d32] font-bold">
                Order detail
              </div>
              <div className="info w-full">
                <ul className="mb-0">
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      Order
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">{order.order}</span>
                  </li>
                  <li className="mb-3">
                    <span className="heading capitalize text-sm font-semibold text-[#292d32]">
                      Note
                    </span>
                    <span className="char--special mx-1">:</span>
                    <span className="txt capitalize">{order.note}</span>
                  </li>
                </ul>
              </div>
            </Space>
          </div>
        </div>
      </div>
    );
  };
  const contentHeader = (order) => {
    return (
      <>
        <div className={clsx("content-header", bgClass, "w-full")}>
          <div className="wrapper">
            <div className="order-info flex items-center gap-2">
              <h4 className="txt text-lg font-bold text-[#292d32] mb-0 capitalize">
                Order detail:
              </h4>
              <span># Order - {order.order_id}</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  const contentBody = (order) => {
    return renderOrderDetail(order);
  };
  // const renderContent = (order) => {
  //   if (Object.keys(order).length) {
  //     return (
  //       <div className="wrapper flex flex-col items-center justify-center gap-4 font-poppins">
  //         {contentHeader(order)}
  //         {contentBody(order)}
  //       </div>
  //     );
  //   }
  //   return null;
  // };
  return (
    <>
      <Header />
      <SectionWrapper
        sectionClass={"order-detail py-0"}
        title={"Chi tiết đơn hàng"}
        content={""}
      />
    </>
  );
};

export default OrderDetail;
