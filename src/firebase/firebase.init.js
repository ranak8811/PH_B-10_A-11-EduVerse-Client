// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: "AIzaSyDIvRIFIV3478GifgzQ3aMmCeW6xAqC7AM",
  //   authDomain: "eduverse-ph-a-11.firebaseapp.com",
  //   projectId: "eduverse-ph-a-11",
  //   storageBucket: "eduverse-ph-a-11.firebasestorage.app",
  //   messagingSenderId: "740144622623",
  //   appId: "1:740144622623:web:6c2cfb0e0168eb3e9bb92a",

  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
