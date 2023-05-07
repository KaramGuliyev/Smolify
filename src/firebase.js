import app from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth, createUserWithEmailAndPassword, useAuthEmulator } from "firebase/auth";
import { connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

console.log(firebaseConfig);

const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const auth = getAuth();

if (process.env.NODE_ENV === "development") {
firestore.useEmulator("localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

async function SignUp(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
  console.log(auth.currentUser);
}

export { firebase, firestore, auth, SignUp };
