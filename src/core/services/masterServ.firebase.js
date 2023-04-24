import { set, get, query, limitToLast, update } from "firebase/database";
import { generateDbRef } from "./configFirebase";

const MASTER_SERVICE_FIREBASE = {
  getLastDataRef: (tablePath) => {
    return get(query(generateDbRef(tablePath), limitToLast(1)));
  },
  addAdminInfo: async (adminId, newAdminData) => {
    return set(generateDbRef(`/admin/${adminId}`), newAdminData);
  },

  updateMaster: (userId, newUserData) => {
    return update(generateDbRef(`/master/${userId}`), newUserData);
  },

  updateAdmin: (userId, newUserData) => {
    return update(generateDbRef(`/admin/${userId}`), newUserData);
  },
};

export default MASTER_SERVICE_FIREBASE;
