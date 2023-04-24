import axios from "axios";
// const BASE_URL = "https://json-server-blond.vercel.app";
// const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://63917e74b750c8d178c4c3ec.mockapi.io/";
const MESSAGE_URL = "https://fcm.googleapis.com/fcm/send";
const BASE_USER_URL = `${BASE_URL}`;

// const AXIOS_INSTANCE_GENERATOR = (BASE_URL) => {
//   let config = {
//     baseURL: BASE_URL,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "Bearer AAAAApn2gl0:APA91bEmHeWZtHMBvrfhCc0aUn__msIkL1-UEwq1S3UmcAM0KTuqc1wcIGZ4v67GCZvKoEf0MvL3DStQE5xEqOd9ROoWwU7d_Eg_Sx5c-S4-oXwpTdTN9QtfVmxSoYkoRMNiuwm_3rg4",
//     },
//   };

//   return axios.create(config);
// };

const AXIOS_MESSAGE_INSTANCE = () => {
  let config = {
    baseURL: MESSAGE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer AAAA61P5zzg:APA91bGSC-JVOwAYAlqrUUo2PviftbklfLzDo0p3O3eC-c10esmws0UQWY9QOllByPegFHWNMoD0apZqpZEp8rGy-dlhGqYGEG4nkedZr80uNk7IQlZfcyJFXh7W_BKqMe1Qw5RJt9Vg",
    },
  };

  return axios.create(config);
};

export {AXIOS_MESSAGE_INSTANCE, BASE_USER_URL };
