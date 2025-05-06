import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBmjugfGorWAvFAwilKSzaTm9mpVACp_Qo",
  authDomain: "gabrielpaoleratickets.firebaseapp.com",
  projectId: "gabrielpaoleratickets",
  storageBucket: "gabrielpaoleratickets.firebasestorage.app",
  messagingSenderId: "1089189119440",
  appId: "1:1089189119440:web:3141db557a5e30c767a5d5",
  measurementId: "G-4C209MQRWZ"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);


export {db, storage, auth};