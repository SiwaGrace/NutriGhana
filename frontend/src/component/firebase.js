// src/component/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIztMkrzW_L-V7aqtb4lrBd8_RXdyk1uU",
  authDomain: "signin-auth-1049d.firebaseapp.com",
  projectId: "signin-auth-1049d",
  storageBucket: "signin-auth-1049d.appspot.com",
  messagingSenderId: "572253088082",
  appId: "1:572253088082:web:fe77a5c1a056e542ff328b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
