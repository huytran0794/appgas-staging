import { AXIOS_MESSAGE_INSTANCE } from "./configURL";

const ADMIN_SERVICE_FIREBASE = {
  sendMessage: async (messageData) => {
    let { data } = await AXIOS_MESSAGE_INSTANCE().post("", messageData);
    return data;
  },
};

export default ADMIN_SERVICE_FIREBASE;
