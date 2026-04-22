// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBY5hOrw8opIUUtYq6QLUhKubJYSIfE0Ok",
  authDomain: "quick-note-eb643.firebaseapp.com",
  projectId: "quick-note-eb643",
  storageBucket: "quick-note-eb643.firebasestorage.app",
  messagingSenderId: "972884405916",
  appId: "1:972884405916:web:04e176ae6b4c71cff34759",
  measurementId: "G-0T7PTCW7P2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
