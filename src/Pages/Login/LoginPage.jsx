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


const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (LOCAL_SERVICE.user.get()) {
      navigate("/");
    }
  }, []);

  const handleFinish = (values, buttonRef) => {
    checkAllInfo(values)
      .then((res) => {
        if (!Object.keys(res).length) {
          CustomNotification(
            "error",
            "Login fails",
            "Please check your login info again"
          );
          throw new Error("Fail!!!");
        }
        buttonRef.current.disabled = true;

        return res;
      }).then((res) => {
        CustomNotification("success", "Login ok", "Please wait a minute");
        setTimeout(() => {
          navigate("/");
          if(res.hasOwnProperty('tasks')) {
            LOCAL_SERVICE.user.set(res, res.role);
          } else {
            LOCAL_SERVICE.user.set({...res, 'tasks': []}, res.role);
          }
        }, 2500);
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
      });
  };

  const renderPage = () => {
    return (
      <PageWrapper className="page-login h-full">
        <Container className="h-full">
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
              {/* <div className="sign-up-txt mb-0 text-center">
                <p className="txt">
                  Not A Member ?{" "}
                  <Link to="/" className="text-blue-ribbon-500 ml-1">
                    Create An Account
                  </Link>
                </p>
              </div> */}
              {/* <div className="social-link">
                <ul className="account-social-link flex justify-center items-center gap-5">
                  <li>
                    <Link
                      to="https://www.google.com/"
                      target="_blank"
                      className="w-12 h-12 rounded-full  bg-[#EBF1FF] flex items-center justify-center"
                    >
                      <AiOutlineGoogle
                        className="text-blue-ribbon-500"
                        size={20}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.facebook.com/"
                      target="_blank"
                      className="w-12 h-12 rounded-full text-blue-ribbon-500 bg-[#EBF1FF] flex items-center justify-center"
                    >
                      <FaFacebookF className="text-blue-ribbon-500" size={16} />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.twitter.com/"
                      target="_blank"
                      className="w-12 h-12 rounded-full text-blue-ribbon-500 bg-[#EBF1FF] flex items-center justify-center"
                    >
                      <FaTwitter className="text-blue-ribbon-500" size={16} />
                    </Link>
                  </li>
                </ul>
              </div> */}
            </Space>
          </div>
        </Container>
      </PageWrapper>
    );
  };

  return renderPage();
};

export default LoginPage;
