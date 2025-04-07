import { initializeApp } from "firebase/app";
import { getFirestore, getDocs } from "firebase/firestore"; 
import { getDatabase, } from "firebase/database"; 


const firebaseConfig = {
  apiKey: "AIzaSyDXSwQWxU2O_Q3VJt4sT0R0MMWeYZRAHVE",
  authDomain: "metropolis-3d.firebaseapp.com",
  projectId: "metropolis-3d",
  storageBucket: "metropolis-3d.appspot.com",
  messagingSenderId: "782231023079",
  appId: "1:782231023079:web:1d77db465359846e5be142"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
