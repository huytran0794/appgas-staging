import { Button } from "antd";
import { useEffect} from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CustomNotification from "../../Components/Notification/CustomNotification";
import { LOCAL_SERVICE } from "../../services/localServ";
import USER_SERVICE_FIREBASE from "../../services/userServ.firebase";



const PrivateRoutes = () => {
  const navigate = useNavigate();
  console.log('new run')
  let auth = LOCAL_SERVICE.user.get();
  
  const callbackFunction = (snapshot) => {
    console.log('snapshot');
    // console.log(snapshot.val()[snapshot.val().length-1]);
    if(snapshot.key === 'tasks') {
      let dataSnap = snapshot.val();
      const btn = (
        <Button type="primary" size="small"
        className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-semibold text-sm transition-all duration-[400ms] rounded-md outline-none border-none"
        onClick={() => {
          navigate(`user/task-tracking/detail/${dataSnap[dataSnap.length-1].id}`);
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
  }

  useEffect(() => {
    if(auth && auth.role.toLowerCase() === 'user') {
      // check if user already has taksks or not
      console.log('role');
      console.log(auth.role);
      USER_SERVICE_FIREBASE.getSingleUserInfo(auth.id)
      .then((snapshot) => {
        if (snapshot.exists()) {
          if(snapshot.val().hasOwnProperty('tasks')) {
            USER_SERVICE_FIREBASE.assignTask(auth.id, true, callbackFunction);
          } else {
            USER_SERVICE_FIREBASE.assignTask(auth.id, false, callbackFunction);
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
