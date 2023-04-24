import React from "react";

import { Space } from "antd";
import { useNavigate } from "react-router-dom";

const UserTaskTrackingActionButtons = ({ taskData }) => {
  const navigate = useNavigate();
  const handleViewTaskDetail = (taskData) => {
    navigate(`/user/task-tracking/detail/${taskData.id}`);
  };
  const renderButtons = () => {
    return (
      <Space size={"middle"} align={"center"} className="btn-actions">
        <div className="icon" style={{ width: "25px", cursor: "pointer" }}>
          <img
            style={{ width: "100%" }}
            onClick={() => handleViewTaskDetail(taskData)}
            src="https://templates.envytheme.com/joxi/default/assets/images/icon/drafts-color.svg"
            alt=""
          />
        </div>
      </Space>
    );
  };
  return <div>{renderButtons()}</div>;
};

export default UserTaskTrackingActionButtons;
