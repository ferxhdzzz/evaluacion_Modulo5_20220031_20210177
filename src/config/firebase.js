import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, test} from '@env';
 
// Your web app's Firebase configuration
const firebaseConfig = {
 
    apiKey: "AIzaSyDxNNUTK7gCjdOGt4vyV9rXbroK9s3F56Q",
   
    authDomain: "actividad-firebase-feryjenn.firebaseapp.com",
   
    projectId: "actividad-firebase-feryjenn",
   
    storageBucket: "actividad-firebase-feryjenn.firebasestorage.app",
   
    messagingSenderId: "607092411654",
   
    appId: "1:607092411654:web:4e18b77095aec30308a287"
   
  };
console.log("Valor de configuracion", firebaseConfig);
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app) {
  console.log('Firebase initialized successfully');
} else {
  console.log('Firebase initialization failed');
}
 
const database = getFirestore(app);
if (database) {
  console.log('Firestore initialized correctly');
} else {
  console.log('Firestore initialization failed');
}
/*
const storage = getStorage(app);
 
if (storage) {
  console.log('storage initialized correctly');
} else {
  console.log('storage initialization failed');
}
*/
//export { database,storage };
export { database };
 