import { Table } from "antd";
import React from "react";
const CustomerOrderHistory = ({ customerInfo }) => {
  let orderHistory = customerInfo.order_history;
  const columns = [
    {
      title: "Order",
      dataIndex: "order",
    },

    {
      title: "Complete Date",
      dataIndex: "complete_date",
    },
  ];
  const expendRowHTML = (order) => (
    <div className="order-more-info">
      <div className="order-info flex items-center gap-2">
        <div className="title font-medium text-lg capitalize">Order info</div>
        <div className="txt">: {order.order}</div>
      </div>
      <div className="note flex items-center gap-2">
        <div className="title font-medium text-lg capitalize">Note :</div>
        <div className="txt">{order.note}</div>
      </div>
    </div>
  );

  return (
    <Table
      columns={columns}
      dataSource={orderHistory}
      size="small"
      rowKey={(order) => order.order_id.toString()}
      expandable={{
        expandRowByClick: true,
        expandedRowRender: (order) => expendRowHTML(order),
      }}
    />
  );
};

export default CustomerOrderHistory;
