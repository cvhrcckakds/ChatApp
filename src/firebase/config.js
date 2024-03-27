// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth" //firebase içinden gelen her şeyi burda import etmek gerek
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-cf467.firebaseapp.com",
  projectId: "chatapp-cf467",
  storageBucket: "chatapp-cf467.appspot.com",
  messagingSenderId: "1004133444924",
  appId: "1:1004133444924:web:f938df8ff576353ced0239"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//!kimlik doğrulama bölümünün referansını uygulamaya al
export const auth = getAuth(app);

//!google sağlayıcısının kurulumu, hepsi sınıf olarak gelir
export const provider = new GoogleAuthProvider()

//veri tabanının referansını al
export const db= getFirestore(app)