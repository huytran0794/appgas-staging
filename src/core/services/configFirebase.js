// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

const VAPID_KEY = "BNhxVWbprb1fOZRLS6SXQjNM6KLpFkS-D-bAWZZ7yer4oFahluognS5yNv7b8SuTUxVzkbv52vRjUJ98B5q4fb4";

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



const messaging = getMessaging();

const requestForToken = async () => {
  return await getToken(messaging, { vapidKey: VAPID_KEY })
};



export { app, storage, database, generateDbRef, firebaseConfig, requestForToken };
