import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { doc, onSnapshot, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function useCart({ user, makeAlert }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function setUpCart() {
      const cartRef = doc(firestore, "app_data", "users", user.uid, "cart");
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.data() === undefined) {
        setDoc(cartRef, {
          products: [],
        });

        setCart([]);
      } else {
        setCart(cartSnap.data().products);
      }

      onSnapshot(cartRef, (cartSnap) => {
        const { products } = cartSnap.data();
        setCart(products);
      });
    }

    setUpCart();
  }, [user]);

  function checkInCart(productId) {
    if (!user) {
      return false;
    }

    let inCart = false;
    cart.forEach((item) => {
      if (item.productId === productId) {
        inCart = true;
      }
    });

    return inCart;
  }

  function addToCart(productId) {
    if (!user) {
      makeAlert("Sign In to manage your cart");
      return;
    }

    if (!checkInCart(productId)) {
      const newItem = {
        productId,
        quantity: 1,
      };

      const cartRef = doc(firestore, "app_data", "users", user.uid, "cart");
      updateDoc(cartRef, {
        products: [...cart, newItem],
      });
    }
  }

  function removeFromCart(productId) {
    if (!user) {
      makeAlert("Sign In to manage your cart");
      return;
    }

    if (!checkInCart(productId)) return;

    const filteredCart = cart.filter((item) => {
      return item.productId !== productId;
    });

    const cartRef = doc(firestore, "app_data", "users", user.uid, "cart");
    updateDoc(cartRef, {
      products: filteredCart,
    });
  }

  function increaseQuantity(productId) {
    if (!user) {
      makeAlert("Sign In to manage your cart");
      return;
    }

    const cartClone = cart.slice();

    cartClone.forEach((item) => {
      if (item.productId !== productId) return;
      item.quantity += 1;

      const cartRef = doc(firestore, "app_data", "users", user.uid, "cart");
      updateDoc(cartRef, { products: cartClone });
    });
  }

  function decreaseQuantity(productId) {
    if (!user) {
      makeAlert("Sign In to manage your cart");
      return;
    }

    const cartClone = cart.slice();

    cartClone.forEach((item) => {
      if (item.productId !== productId) return;

      if (item.quantity !== 1) {
        item.quantity -= 1;
        const cartRef = doc(firestore, "app_data", "users", user.uid, "cart");
        updateDoc(cartRef, { products: cartClone });
      } else {
        removeFromCart(productId);
        return;
      }
    });
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    checkInCart,
  };
}
