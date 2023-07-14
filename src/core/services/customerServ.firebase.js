import {
  child,
  get,
  remove,
  onValue,
  set,
  update,
  query,
  limitToLast,
} from "firebase/database";
import { generateDbRef } from "./configFirebase";

const CUSTOMER_SERVICE_FIREBASE = {
  getCustomerList: () => {
    return get(child(generateDbRef(), `customers`));
  },
  getCustomerInfo: (customerId) => {
    return get(child(generateDbRef(), `/customers/${customerId}`));
  },

  getCustomerInfoObserver: (setFunc) => {
    onValue(generateDbRef(`/customers`), (snapshot) => {
      setFunc(snapshot);
    });
  },

  getSingleCustomerInfoObserver: (setFunc, customerId) => {
    if (!customerId) {
      throw new Error("Please send customerId");
    }
    onValue(generateDbRef(`/customers/${customerId}`), (snapshot) => {
      setFunc(snapshot);
    });
  },

  deleteCustomer: (customerId) => {
    return remove(generateDbRef(`/customers/${customerId}`));
  },

  updateCustomer: (customerId, newCustomerData) => {
    return update(generateDbRef(`/customers/${customerId}`), newCustomerData);
  },

  addCustomer: (customerId, newCustomerData) => {
    return set(generateDbRef(`/customers/${customerId}`), newCustomerData);
  },

  getLastDataRef: (tablePath) => {
    return get(query(generateDbRef(tablePath), limitToLast(1)));
  },
};

export default CUSTOMER_SERVICE_FIREBASE;
