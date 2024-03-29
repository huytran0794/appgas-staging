import { Space } from "antd";
import React, { useEffect } from "react";
import Container from "../../core/Components/Container/Container";
import PageWrapper from "../../core/Components/PageWrapper/PageWrapper";

import logoPage from "../../core/assets/images/logo.png";

import LoginForm from "../../core/Components/Forms/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import CustomNotification from "../../core/Components/Notification/CustomNotification";
import { LOCAL_SERVICE } from "../../core/services/localServ";

import { checkAllInfo } from "../../core/utils/checkLogin";

import { userActions } from "../../core/redux/slice/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (LOCAL_SERVICE.user.get()) {
      navigate("/");
    }
  }, [navigate]);

  const handleFinish = (values, buttonRef) => {
    buttonRef.current.disabled = true;
    checkAllInfo(values)
      .then((res) => {
        if (!Object.keys(res).length) {
          CustomNotification(
            "error",
            "Login fails",
            "Please check your login info again",
            "",
            Date.now()
          );
          buttonRef.current.disabled = false;
          throw new Error("Fail!!!");
        }
        return res;
      })
      .then((res) => {
        CustomNotification(
          "success",
          "Login ok",
          "Please wait a minute",
          "",
          Date.now()
        );
        setTimeout(() => {
          navigate("/");
          if (res.hasOwnProperty("tasks")) {
            LOCAL_SERVICE.user.set(res, res.role);
            dispatch(userActions.setUserProfile(res, res.role));
          } else {
            LOCAL_SERVICE.user.set({ ...res, tasks: [] }, res.role);
            dispatch(
              userActions.setUserProfile({ ...res, tasks: [] }, res.role)
            );
          }
        }, 4500);
      })
      .catch((error) => {
        buttonRef.current.disabled = false;
        console.log("error");
        console.log(error);
      });
  };

  const renderPage = () => {
    return (
      <PageWrapper className="page-login h-screen">
        <Container className="h-screen">
          <div className="wrapper flex items-center justify-center h-full">
            <Space
              className="form-wrapper bg-white rounded-[15px] p-7 max-w-[500px] w-full"
              align="center"
              direction="vertical"
              size={20}
            >
              <div className="form-header text-center w-full">
                <Link to="/" className="pb-8 flex items-center justify-center">
                  <img src={logoPage} alt="logo-page" className="logo" />
                </Link>
                <h3 className="form-title border-t border-solid border-[#EBF1FF] pt-8 text-xl font-semibold mb-0">
                  Login
                </h3>
              </div>
              <div className="form-body">
                <LoginForm handleFinish={handleFinish} />
              </div>
            </Space>
          </div>
        </Container>
      </PageWrapper>
    );
  };

  return renderPage();
};

export default LoginPage;
