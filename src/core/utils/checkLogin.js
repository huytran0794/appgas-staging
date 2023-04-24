import USER_SERVICE_FIREBASE from "../services/userServ.firebase";

const checkLogin = (item, values) => {
  return item.findIndex(
    (data) => data.email === values.email && data.password === values.password
  );
};

const checkAdminInfo = async (values) => {
  return USER_SERVICE_FIREBASE.getAdminInfo()
    .then((snapshot) => {
      if (snapshot.exists()) {
        let userData = {};
        snapshot.forEach((item) => {
          let val = item.val();
          if (val.email === values.email && val.password === values.password) {
            userData = { ...val, id: item.key, role: "admin" };
            return true;
          }
        });

        return userData;
      }
      return {};
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkUserInfo = async (values) => {
  return USER_SERVICE_FIREBASE.getUserInfo()
    .then((snapshot) => {
      let userData = {};
      if (snapshot.exists()) {
        snapshot.forEach((item) => {
          let val = item.val();
          if (val.email === values.email && val.password === values.password) {
            userData = { ...val, id: item.key, role: "user" };
            return true;
          }
        });
        return userData;
      }
      return {};
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkMasterInfo = async (values) => {
  return USER_SERVICE_FIREBASE.getMasterInfo()
    .then((snapshot) => {
      let userData = {};
      if (snapshot.exists()) {
        snapshot.forEach((item) => {
          let val = item.val();
          if (val.email === values.email && val.password === values.password) {
            userData = { ...val, id: item.key, role: "master" };
            return true;
          }
        });
        return userData;
      }
      return {};
    })
    .catch((error) => {
      console.log(error);
    });
};

const checkAllInfo = async (values) => {
  let userData;
  try {
    userData = await checkAdminInfo(values);
    if (!Object.keys(userData).length) {
      userData = await checkUserInfo(values);
    }
    if (!Object.keys(userData).length) {
      userData = await checkMasterInfo(values);
    }
  } catch (error) {
    console.log("error overall");
    console.log(error);
  }

  return userData;
};

export { checkLogin, checkAllInfo };
