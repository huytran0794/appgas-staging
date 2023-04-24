import React from "react";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";

const UserTaskActionButtons = ({ userData }) => {
  const navigate = useNavigate();
  const handleTaskAssign = () => {
    navigate(`/admin/user/task-assign/${userData.id}`);
  };
  const renderButtons = () => {
    return (
      <Space size={"middle"} align={"center"} className="btn-actions">
        <div className="icon" style={{ width: "25px", cursor: "pointer" }}>
          <img
            style={{ width: "100%" }}
            onClick={() => handleTaskAssign(userData)}
            src="https://templates.envytheme.com/joxi/default/assets/images/icon/drafts-color.svg"
            alt=""
          />
        </div>
      </Space>
    );
  };
  return <div>{renderButtons()}</div>;
};

export default UserTaskActionButtons;
