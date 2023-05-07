import {
  set,
  get,
  query,
  limitToLast,
  update,
  child,
  onValue,
  remove,
} from "firebase/database";
import { generateDbRef } from "./configFirebase";

const MASTER_SERVICE_FIREBASE = {
  getLastDataRef: (tablePath) => {
    return get(query(generateDbRef(tablePath), limitToLast(1)));
  },

  addAdminInfo: async (adminId, newAdminData) => {
    return set(generateDbRef(`/admin/${adminId}`), newAdminData);
  },
  deleteAdmin: (adminId) => {
    return remove(generateDbRef(`/admin/${adminId}`));
  },

  updateAdmin: (adminId, newAdminData) => {
    return update(generateDbRef(`/admin/${adminId}`), newAdminData);
  },
  // updateMaster: (admin, newUserData) => {
  //   return update(generateDbRef(`/master/${admin}`), newUserData);
  // },

  getAdminInfo: () => {
    return get(child(generateDbRef(), "admin"));
  },

  getSingleAdminInfo: (adminId) => {
    return get(child(generateDbRef(), `/admin/${adminId}`));
  },

  getAdminInfoObserver: (setFunc) => {
    onValue(generateDbRef(`/admin`), (snapshot) => {
      setFunc(snapshot);
    });
  },
};

export default MASTER_SERVICE_FIREBASE;
