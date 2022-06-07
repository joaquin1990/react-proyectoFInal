// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa0NrTXoDUEYhEtdf0esrcUiBKmTQZmLg",
  authDomain: "react-claire-20c9d.firebaseapp.com",
  projectId: "react-claire-20c9d",
  storageBucket: "react-claire-20c9d.appspot.com",
  messagingSenderId: "748903782822",
  appId: "1:748903782822:web:8d86d572ff00d747299767",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function getFirestoreApp() {
  return app;
}
