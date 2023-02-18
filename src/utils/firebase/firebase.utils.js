import { logDOM } from '@testing-library/react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWcb2khNUZPj9riz9wRy0upeeR6CWTXiE",
  authDomain: "crwn-clothing-db-66de4.firebaseapp.com",
  projectId: "crwn-clothing-db-66de4",
  storageBucket: "crwn-clothing-db-66de4.appspot.com",
  messagingSenderId: "573750944168",
  appId: "1:573750944168:web:792085b9b1b9826270fd9d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log("UserDocRef: ", userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
          console.log("Error creating the user: ", error.message);
      }
  }

  return userDocRef;
}