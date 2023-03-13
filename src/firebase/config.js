import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAN54JbQffDZn58DGaEONdgbZc8DL707nY",
  authDomain: "cartelera-caracas-microp2.firebaseapp.com",
  projectId: "cartelera-caracas-microp2",
  storageBucket: "cartelera-caracas-microp2.appspot.com",
  messagingSenderId: "835170404963",
  appId: "1:835170404963:web:32da95aa1b941044f20656",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const store = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
