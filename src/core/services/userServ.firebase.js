import {
  child,
  get,
  remove,
  onValue,
  set,
  update,
  query,
  limitToLast,
  onChildChanged,
  onChildAdded,
} from "firebase/database";
import { generateDbRef } from "./configFirebase";

const USER_SERVICE_FIREBASE = {
  getAdminInfo: () => {
    return get(child(generateDbRef(), "admin"));
  },
  getUserInfo: () => {
    return get(child(generateDbRef(), "users"));
  },
  getMasterInfo: () => {
    return get(child(generateDbRef(), "master"));
  },
  getSingleUserInfo: (userId) => {
    return get(child(generateDbRef(), `/users/${userId}`));
  },

  getUserInfoObserver: (setFunc) => {
    onValue(generateDbRef(`/users`), (snapshot) => {
      setFunc(snapshot);
    });
  },

  getSingleUserInfoObserver: (setFunc, userId) => {
    onValue(generateDbRef(`/users/${userId}`), (snapshot) => {
      setFunc(snapshot);
    });
  },

  assignTask: (userId, hasTask, callbackFunc) => {
    if (hasTask) {
      console.log("child changed on has task");
      onChildChanged(generateDbRef(`/users/${userId}`), (snapshot) => {
        callbackFunc(snapshot);
      });
    }

    if (!hasTask) {
      console.log("child added to has no task");
      onChildAdded(generateDbRef(`/users/${userId}`), (snapshot) => {
        callbackFunc(snapshot);
      });
    }
  },

  deleteTask: (taskId) => {
    return generateDbRef();
  },

  deleteUser: (userId) => {
    return remove(generateDbRef(`/users/${userId}`));
  },

  updateUser: (userId, newUserData) => {
    return update(generateDbRef(`/users/${userId}`), newUserData);
  },

  addUser: (newUserId, newUserData) => {
    return set(generateDbRef(`/users/${newUserId}`), newUserData);
  },

  getLastDataRef: (tablePath) => {
    return get(query(generateDbRef(tablePath), limitToLast(1)));
  },
};

export default USER_SERVICE_FIREBASE;
