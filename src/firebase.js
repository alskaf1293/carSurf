 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJAmZ05Qha9DYGwuU0TrY1t7ExdHwIFIw",
  authDomain: "carsurf-acf00.firebaseapp.com",
  projectId: "carsurf-acf00",
  storageBucket: "carsurf-acf00.appspot.com",
  messagingSenderId: "991768134712",
  appId: "1:991768134712:web:4ca01844abe6c58cec92cd",
  measurementId: "G-2Y3929Y88K"
};
 // Initialize Firebase
 
 const app = initializeApp(firebaseConfig);
 // Export firestore database
 // It will be imported into your react app whenever it is needed
 export const db = getFirestore(app);