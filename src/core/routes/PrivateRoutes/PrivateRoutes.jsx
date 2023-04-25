import { Button } from "antd";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CustomNotification from "../../Components/Notification/CustomNotification";
import { LOCAL_SERVICE } from "../../services/localServ";
import USER_SERVICE_FIREBASE from "../../services/userServ.firebase";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/slice/userSlice";

const PrivateRoutes = () => {
  const navigate = useNavigate();
  let auth = LOCAL_SERVICE.user.get();
  let dispatch = useDispatch();

  const callbackFunction = (snapshot) => {
    let dataSnap = snapshot.val();
    console.log("snapshot");
    console.log(snapshot.key);
    if (snapshot.key === "tasks") {
      auth[snapshot.key] = dataSnap;
      LOCAL_SERVICE.user.set(auth, auth.role);
      const btn = (
        <Button
          type="primary"
          size="large"
          className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
          onClick={() => {
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
        6
      );
    }

    auth[snapshot.key] = dataSnap;
    LOCAL_SERVICE.user.set(auth, auth.role);
    dispatch(userActions.setUserProfile(auth));
  };

  useEffect(() => {
    let getSnapShot = (snapshot) => {
      if (auth) {
        if (snapshot.exists()) {
          if (auth.role.toLowerCase() === "user") {
            console.log("run in here");
            USER_SERVICE_FIREBASE.assignTask(
              auth.id,
              snapshot.val().hasOwnProperty("tasks"),
              callbackFunction
            );
          }
        }
      }
    };
    USER_SERVICE_FIREBASE.getSingleUserInfoObserver(auth.id, getSnapShot);
  }, []);

  return auth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;
