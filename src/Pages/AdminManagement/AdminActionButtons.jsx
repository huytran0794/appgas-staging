import React from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";

import { Modal, Popover, Space } from "antd";

import { useNavigate } from "react-router-dom";
import { DesktopView, MobileView, TabletView } from "../../core/HOC/Responsive";

import { TfiMore } from "react-icons/tfi";
import MASTER_SERVICE_FIREBASE from "../../core/services/masterServ.firebase";

const AdminActionButtons = ({ adminData }) => {
  const { confirm } = Modal;
  const navigate = useNavigate();
  const showDeleteConfirm = (title, content = "", handleOK) => {
    confirm({
      title: title,
      content: content,
      okText: "Yes",
      okButtonProps: {
        className: "btn-delete-ok",
      },
      cancelButtonProps: {
        className: "btn-delete-cancel",
      },
      cancelText: "No",
      onOk() {
        handleOK();
      },
      onCancel() {
        console.log("Cancel");
      },
      centered: true,
      wrapClassName: "modal-confirm-delete",
    });
  };

  const handleDeleteCustomer = (adminData) => {
    showDeleteConfirm(
      `Are you sure you want to delete admin ${adminData.fullname} ?`,
      "",
      () => deleteAdmin(adminData)
    );
  };

  const deleteAdmin = (adminData) => {
    MASTER_SERVICE_FIREBASE.deleteAdmin(adminData.id)
      .then(() => {})
      .catch((error) => {});
  };

  // const handleView = (adminData) => {
  //   navigate(`/admin/user/view/${adminData.id}`);
  // };
  const handleEdit = () => {
    navigate(`/master/admin/edit/${adminData.id}`);
  };

  const renderButtons = () => {
    return (
      <>
        <DesktopView>{renderDesktopViewButtons()}</DesktopView>
        <TabletView>{renderMobileViewButtons()}</TabletView>
        <MobileView>{renderMobileViewButtons()}</MobileView>
      </>
    );
  };

  const renderDesktopViewButtons = () => {
    return (
      <Space size={"middle"} align={"center"} className="btn-actions">
        {/* <SlEye
          onClick={() => handleView(adminData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#3F80FD"}
        /> */}
        <AiOutlineEdit
          onClick={() => handleEdit(adminData)}
          className="cursor-pointer"
          size={"20px"}
          color={"#82D973"}
        />
        <FiTrash
          onClick={() => {
            handleDeleteCustomer(adminData);
          }}
          className="cursor-pointer"
          size={"20px"}
          color={"red"}
        />
      </Space>
    );
  };
  const renderMobileViewButtons = () => {
    const itemSize = "23px";
    let popOverContent = (
      <Space
        size={30}
        align={"center"}
        className="btn-actions justify-center w-full"
      >
        {/* <SlEye
          onClick={() => handleView(adminData)}
          className="cursor-pointer"
          size={itemSize}
          color={"#3F80FD"}
        /> */}
        <AiOutlineEdit
          onClick={() => handleEdit(adminData)}
          className="cursor-pointer"
          size={itemSize}
          color={"#82D973"}
        />
        <FiTrash
          onClick={() => {
            handleDeleteCustomer(adminData);
          }}
          className="cursor-pointer"
          size={itemSize}
          color={"red"}
        />
      </Space>
    );
    return (
      <Popover placement="bottomRight" content={popOverContent} trigger="click">
        <TfiMore size={20} />
      </Popover>
    );
  };
  return <div>{renderButtons()}</div>;
};

export default AdminActionButtons;
