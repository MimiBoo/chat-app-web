import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2sQcYCW6qpaCioNGiDsvpP8f2fAjLsWQ",
  authDomain: "doctor-chat-468af.firebaseapp.com",
  projectId: "doctor-chat-468af",
  storageBucket: "doctor-chat-468af.appspot.com",
  messagingSenderId: "27725015947",
  appId: "1:27725015947:web:d089ee60dc5c89b2119d8e",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
