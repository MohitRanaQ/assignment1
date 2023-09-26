import { initializeApp } from "firebase/app";
import { getAuth, Auth   } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC4e1EbwHocLupO4IwDsTb3xZuOcj3SwbE",
  authDomain: "test-fc9ca.firebaseapp.com",
  projectId: "test-fc9ca",
  storageBucket: "test-fc9ca.appspot.com",
  messagingSenderId: "80533414719",
  appId: "1:80533414719:web:02c1fc878a66eced7de98a",
  measurementId: "G-WZLD0JDXF3",
};



const app = initializeApp(firebaseConfig);


const auth: Auth = getAuth(app);
 const db = getDatabase(app);
const firestore = getFirestore(app); 
export { auth, db, firestore };
export default app;
