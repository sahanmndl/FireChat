import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCLhLautCTQjAoX1fnUA2wTRPNzFDx6Vjo",
  authDomain: "firechat-21022.firebaseapp.com",
  projectId: "firechat-21022",
  storageBucket: "firechat-21022.appspot.com",
  messagingSenderId: "540208619389",
  appId: "1:540208619389:web:9c5afd75a1c2138ecef614",
  measurementId: "G-1EP3SJM60F"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()