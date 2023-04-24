// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";

// update to development google account
const firebaseConfig = {
  apiKey: "AIzaSyB3D2kAQSgmLdA8MZvQlvc8yzxBZ3Ye8lM",
  authDomain: "gas-project-77564.firebaseapp.com",
  databaseURL: "https://gas-project-77564-default-rtdb.firebaseio.com",
  projectId: "gas-project-77564",
  storageBucket: "gas-project-77564.appspot.com",
  messagingSenderId: "1010726195000",
  appId: "1:1010726195000:web:46e05f9cf517d885c9bbcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const database = getDatabase(app);

const generateDbRef = (tablePath = "", ...args) => {
  if (tablePath) {
    return ref(database, tablePath);
  }
  return ref(database);
};

export { app, storage, database, generateDbRef, firebaseConfig };
