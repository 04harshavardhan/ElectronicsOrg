import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { doc, getDoc, setDoc, onSnapshot, updateDoc } from "firebase/firestore";

export default function useFavs({ user, makeAlert }) {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function setUpFavs() {
      const favsRef = doc(firestore, "app_data", "users", user.uid, "favs");
      const favsSnap = await getDoc(favsRef);

      if (favsSnap.data() === undefined) {
        setDoc(favsRef, {
          products: [],
        });

        setFavs([]);
      } else {
        setFavs(favsSnap.data().products);
      }

      onSnapshot(favsRef, (favsSnap) => {
        const { products } = favsSnap.data();
        setFavs(products);
      });
    }

    setUpFavs();
  }, [user]);

  function checkInFavs(productId) {
    if (!user) {
      return false;
    }

    return favs.includes(productId);
  }

  function addToFavs(productId) {
    if (!user) {
      makeAlert("Sign In to manage your favourites");
      return;
    }

    if (!checkInFavs(productId)) {
      const favsRef = doc(firestore, "app_data", "users", user.uid, "favs");
      updateDoc(favsRef, {
        products: [...favs, productId],
      });
    }
  }

  function removeFromFavs(productId) {
    if (!user) {
      makeAlert("Sign In to manage your favourites");
      return;
    }

    if (!checkInFavs(productId)) return;

    const favsClone = favs.slice();
    const i = favs.indexOf(productId);

    favsClone.splice(i, 1);

    const favsRef = doc(firestore, "app_data", "users", user.uid, "favs");
    updateDoc(favsRef, {
      products: favsClone,
    });
  }

  return {
    favs,
    addToFavs,
    removeFromFavs,
    checkInFavs,
  };
}
