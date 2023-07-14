import { AXIOS_MESSAGE_INSTANCE } from "./configURL";
import { onValue } from "firebase/database";
import { generateDbRef } from "./configFirebase";
const ADMIN_SERVICE_FIREBASE = {
  sendMessage: async (messageData) => {
    let { data } = await AXIOS_MESSAGE_INSTANCE().post("", messageData);
    return data;
  },
  getSingleAdminInfoObserver: (setFunc, adminId) => {
    onValue(generateDbRef(`/admin/${adminId}`), (snapshot) => {
      setFunc(snapshot);
    });
  },
};

export default ADMIN_SERVICE_FIREBASE;
