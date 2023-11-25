// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-2e555.firebaseapp.com",
  projectId: "mern-auth-2e555",
  storageBucket: "mern-auth-2e555.appspot.com",
  messagingSenderId: "1083551425339",
  appId: "1:1083551425339:web:26e023170fc587bfaa0d1e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);