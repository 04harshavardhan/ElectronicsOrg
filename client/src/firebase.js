import { useState } from "react";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBTtMQERr7kqo9gcdvmUBLes7jbqFU59_4",
  authDomain: "electronicsorg-e1ab1.firebaseapp.com",
  projectId: "electronicsorg-e1ab1",
  storageBucket: "electronicsorg-e1ab1.appspot.com",
  messagingSenderId: "20626844954",
  appId: "1:20626844954:web:bf9f437794171ce83590a3",
  measurementId: "G-ED402ZHTKD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore(app);

export function useAuth() {
  const [user, setUser] = useState(null);
  const [userIdToken, setIdToken] = useState("");
  const [loadingUser, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken(/* forceRefresh */ true);

        setIdToken(idToken);
        setUser(currentUser);
      } else {
        setUser(null);
      }

      setLoading(() => false);
    });
  }, []);

  return { user, userIdToken, loadingUser };
}

export function signUp({ email, password, error = () => {}, next = () => {} }) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(next)
    .catch(({ code }) => {
      error(code);
    });
}

export function signIn({ email, password, error = () => {}, next = () => {} }) {
  signInWithEmailAndPassword(auth, email, password)
    .then(next)
    .catch(({ code }) => {
      error(code);
    });
}

export function signOutUser() {
  signOut(auth);
}
