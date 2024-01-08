import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDv5VqwkGAFsaEHma9GA-xeFwg0aK8vsf4",
  authDomain: "mini-c872a.firebaseapp.com",
  projectId: "mini-c872a",
  storageBucket: "mini-c872a.appspot.com",
  messagingSenderId: "32155231427",
  appId: "1:32155231427:web:e8d31a9e20901b9badae76",
  measurementId: "G-2RKYCYRGG1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();