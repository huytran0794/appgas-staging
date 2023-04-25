import { Button, notification } from "antd";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CustomNotification from "../../Components/Notification/CustomNotification";
import { LOCAL_SERVICE } from "../../services/localServ";
import USER_SERVICE_FIREBASE from "../../services/userServ.firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slice/userSlice";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  let auth = LOCAL_SERVICE.user.get();
  let dispatch = useDispatch();

  const callbackFunction = (snapshot) => {
    let dataSnap = snapshot.val();
    if (snapshot.key === "tasks") {
      if (dataSnap.length > auth[snapshot.key].length) {
        let notiKey = Date.now();
        const btn = (
          <Button
            type="primary"
            size="large"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
            onClick={() => {
              notification.destroy(notiKey);
              navigate(
                `/user/task-tracking/detail/${dataSnap[dataSnap.length - 1].id}`
              );
            }}
          >
            Go to task page
          </Button>
        );
        CustomNotification(
          "info",
          "You have an order",
          "Please check your order",
          btn,
          notiKey,
          2
        );
      }
    }

    auth[snapshot.key] = dataSnap;
    LOCAL_SERVICE.user.set(auth, auth.role);
    dispatch(userActions.setUserProfile(auth));
  };

  // useEffect(() => {
  //   let getSnapShot = (snapshot) => {
  //     if (auth) {
  //       if (snapshot.exists()) {
  //         if (auth.role.toLowerCase() === "user") {
  //           console.log("run in here");
  //           USER_SERVICE_FIREBASE.assignTask(
  //             auth.id,
  //             snapshot.val().hasOwnProperty("tasks"),
  //             callbackFunction
  //           );
  //         }
  //       }
  //     }
  //   };
  //   USER_SERVICE_FIREBASE.getSingleUserInfoObserver(auth.id, getSnapShot);
  // }, []);

  useEffect(() => {
    if (auth && auth.role.toLowerCase() === "user") {
      // check if user already has taksks or not
      USER_SERVICE_FIREBASE.getSingleUserInfo(auth.id)
        .then((snapshot) => {
          if (snapshot.exists()) {
            if (snapshot.val().hasOwnProperty("tasks")) {
              USER_SERVICE_FIREBASE.assignTask(auth.id, true, callbackFunction);
            } else {
              USER_SERVICE_FIREBASE.assignTask(
                auth.id,
                false,
                callbackFunction
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;
