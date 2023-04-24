const USER_STORAGE_KEY = "USER_ACCOUNT_INFO";
const USER_ROLE_KEY = "USER_ROLE";
const APP_REG_TOKEN = "APP_REG_TOKEN";
export const LOCAL_SERVICE = {
  user: {
    set: (dataLogin, role = "") => {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(dataLogin));
      role && localStorage.setItem(USER_ROLE_KEY, role);
    },
    get: () => {
      let localDataLogin = localStorage.getItem(USER_STORAGE_KEY);
      return localDataLogin ? JSON.parse(localDataLogin) : null;
    },
    getRole: () => {
      let localDataLogin = localStorage.getItem(USER_ROLE_KEY);
      return localDataLogin ? localDataLogin : null;
    },
    unset: () => {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(USER_ROLE_KEY);
    },
  },
  appToken: {
    set:(token) => {
      localStorage.setItem(APP_REG_TOKEN, JSON.stringify(token));
    },
    get:() => {
      let localToken = localStorage.getItem(APP_REG_TOKEN);
      return localToken ? JSON.parse(localToken) : null;
    },
    unset: () => {
      localStorage.removeItem(APP_REG_TOKEN);
    }
  }
};
