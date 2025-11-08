import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyC3KY8lqtDIhBxrD3kaNv2MuU5qdYREI40",
  authDomain: "fir-auth-project-2fb43.firebaseapp.com",
  databaseURL:
    "https://fir-auth-project-2fb43-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-auth-project-2fb43",
  storageBucket: "fir-auth-project-2fb43.firebasestorage.app",
  messagingSenderId: "810632559977",
  appId: "1:810632559977:web:b80cebd6d0128fd70251f8",
};

const app = initializeApp(firebaseConfig);
export const usersDB = getDatabase(app);
export const auth = getAuth(app);
