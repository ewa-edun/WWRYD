import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBhN3RlkD4pL1g-UWX_J0l6Z9Jn2zeBSUs",
  authDomain: "wwyrd-5d9dc.firebaseapp.com",
  projectId: "wwyrd-5d9dc",
  storageBucket: "wwyrd-5d9dc.firebasestorage.app",
  messagingSenderId: "407308326011",
  appId: "1:407308326011:web:48478c87c0d7c0bd16fede",
  measurementId: "G-9SX1VDBPJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
