// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore" 
import {getAuth} from "firebase/auth";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: "my-podcast-app-51954.firebaseapp.com",
  projectId: "my-podcast-app-51954",
  storageBucket: "my-podcast-app-51954.appspot.com",
  messagingSenderId: "929867344011",
  appId: "1:929867344011:web:c5567134e3a3d57baecc8e",
  measurementId: "G-RVVR3HGWYM"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);


export {db,storage,auth};