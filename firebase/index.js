import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHi9lIoFLCsTA1o2ijJMaVIm9-cZX4vTg",
  authDomain: "cs55-13-week07-app.firebaseapp.com",
  projectId: "cs55-13-week07-app",
  storageBucket: "cs55-13-week07-app.appspot.com",
  messagingSenderId: "852021440977",
  appId: "1:852021440977:web:6fcaafda2ba1d9dbbfb0f0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };