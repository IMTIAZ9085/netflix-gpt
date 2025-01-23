// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "firebase/app";
import {
  getAnalytics
} from "firebase/analytics";
import {
  getAuth
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDILGwUdEqhbRRM4mIau0r_s6arpRvQl98",
  authDomain: "netflixgpt-852c8.firebaseapp.com",
  projectId: "netflixgpt-852c8",
  storageBucket: "netflixgpt-852c8.firebasestorage.app",
  messagingSenderId: "990986761139",
  appId: "1:990986761139:web:1da0fde29f8c0ed71dd1c6",
  measurementId: "G-DH2EJ19H35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();







// https://netflixgpt-852c8.web.app