import { Button, notification } from "antd";
import { useEffect, useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import CustomNotification from "../../Components/Notification/CustomNotification";
import { LOCAL_SERVICE } from "../../services/localServ";
import USER_SERVICE_FIREBASE from "../../services/userServ.firebase";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/slice/userSlice";
import ADMIN_SERVICE_FIREBASE from "../../services/adminServ.firebase";
import MASTER_SERVICE_FIREBASE from "../../services/masterServ.firebase";

const PrivateRoutes = () => {
  let notiRef = useRef(null);
  let auth = LOCAL_SERVICE.user.get();
  let dispatch = useDispatch();
  let count = 0;
  const callbackFunction = (snapshot) => {
    let notiKey = Date.now();
    let dataSnap = snapshot.val();
    if (snapshot.key === "tasks") {
      if (dataSnap.length - auth[snapshot.key].length === 1) {
        if (notiRef.current) {
          notification.destroy(notiRef.current);
        }
        const btn = (
          <Button
            type="primary"
            size="large"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
            onClick={() => {
              notification.destroy(notiKey);
              window.location.replace(
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
          4
        );
        notiRef.current = notiKey;
        count += 1;
      }
      auth[snapshot.key] = dataSnap;
      LOCAL_SERVICE.user.set(auth, auth.role);
      dispatch(userActions.setUserProfile(auth));
    }
  };

  useEffect(() => {
    let getUserSnapShot = (snapshot) => {
      if (snapshot.exists()) {
        console.log("snapshot");
        console.log(snapshot.val());
        auth = { ...auth, ...snapshot.val() };
        LOCAL_SERVICE.user.set(auth, auth.role);
        dispatch(userActions.setUserProfile(auth));

        USER_SERVICE_FIREBASE.assignTask(
          auth.id,
          snapshot.val().hasOwnProperty("tasks"),
          callbackFunction
        );
      }
    };

    let getAdminSnapShot = (snapshot) => {
      if (snapshot.exists()) {
        auth = { ...auth, ...snapshot.val() };
        LOCAL_SERVICE.user.set(auth, auth.role);
        dispatch(userActions.setUserProfile(auth));
      }
    };

    let getMasterSnapShot = (snapshot) => {
      if (snapshot.exists()) {
        auth = { ...auth, ...snapshot.val() };
        LOCAL_SERVICE.user.set(auth, auth.role);
        dispatch(userActions.setUserProfile(auth));
      }
    };

    if (auth) {
      if (auth.role.toLowerCase() === "user") {
        USER_SERVICE_FIREBASE.getSingleUserInfoObserver(
          getUserSnapShot,
          auth.id
        );
      }

      if (auth.role.toLowerCase() === "admin") {
        ADMIN_SERVICE_FIREBASE.getSingleAdminInfoObserver(
          getAdminSnapShot,
          auth.id
        );
      }

      if (auth.role.toLowerCase() === "master") {
        MASTER_SERVICE_FIREBASE.getSingleMasterInfoObserver(
          getMasterSnapShot,
          auth.id
        );
      }
    }
  }, []);

  // useEffect(() => {
  //   if (auth && auth.role.toLowerCase() === "user") {
  //     // check if user already has taksks or not
  //     USER_SERVICE_FIREBASE.getSingleUserInfo(auth.id)
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           if (snapshot.val().hasOwnProperty("tasks")) {
  //             USER_SERVICE_FIREBASE.assignTask(auth.id, true, callbackFunction);
  //           } else {
  //             USER_SERVICE_FIREBASE.assignTask(
  //               auth.id,
  //               false,
  //               callbackFunction
  //             );
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }, []);

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;
