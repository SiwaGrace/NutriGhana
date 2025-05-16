// src/component/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCi3JarsLMN3CQ6Lh54Pjc6S7xtE0eXlh8",
  authDomain: "login1-c931f.firebaseapp.com",
  projectId: "login1-c931f",
  storageBucket: "login1-c931f.firebasestorage.app",
  messagingSenderId: "933527804042",
  appId: "1:933527804042:web:b439c98d16396ebf013573",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
