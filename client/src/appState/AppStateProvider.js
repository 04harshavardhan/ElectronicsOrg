import React, { createContext, useContext } from "react";

import { useAuth } from "../firebase";

import useProducts from "./products";
import useCart from "./cart";
import useFavs from "./favs";
import useAlerts from "./alert";

const AppStateContext = createContext();
export const useAppState = () => useContext(AppStateContext);

export function AppStateProvider({ children }) {
  const { alert, makeAlert } = useAlerts();

  const { products, getProduct, loadingProducts } = useProducts();

  const { user, userIdToken, loadingUser } = useAuth();

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    checkInCart,
  } = useCart({ user, makeAlert });
  let { favs, addToFavs, removeFromFavs, checkInFavs } = useFavs({
    user,
    makeAlert,
  });

  const state = {
    user,
    userIdToken,
    loadingUser,
    products,
    loadingProducts,
    cart,
    favs,
    alert,
  };

  const actions = {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    checkInCart,
    addToFavs,
    removeFromFavs,
    checkInFavs,
    getProduct,
    makeAlert,
  };

  return (
    <AppStateContext.Provider value={{ state, actions }}>
      {children}
    </AppStateContext.Provider>
  );
}
