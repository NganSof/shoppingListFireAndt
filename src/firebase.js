import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgTb2CJXxoDs96OITNRGu08iTXHLOlMM8",
  authDomain: "shopping-list-nellie.firebaseapp.com",
  databaseURL: "https://shopping-list-nellie-default-rtdb.firebaseio.com",
  projectId: "shopping-list-nellie",
  storageBucket: "shopping-list-nellie.appspot.com",
  messagingSenderId: "1090192819273",
  appId: "1:1090192819273:web:e9a0ca53e5a1c927ec2b98",
  measurementId: "G-ZJ6Q15NKS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
