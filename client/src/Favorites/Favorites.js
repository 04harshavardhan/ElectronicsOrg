import React from "react";
import "./Favorites.css";

import { useAppState } from "../appState/AppStateProvider";
import FavoriteCard from "./FavoriteCard";

import FavoritesListIcon from "../Components/FavoritesListIcon";

export default function Favorites() {
  const {
    state: { favs },
    actions: { getProduct, checkInCart, checkInFavs },
  } = useAppState();

  const favoriteCards = favs.map((productId, i) => {
    const product = getProduct(productId);
    const inCart = checkInCart(productId);
    const inFavs = checkInFavs(productId);

    return (
      <FavoriteCard product={product} key={i} inCart={inCart} inFavs={inFavs} />
    );
  });

  if (favs.length === 0) {
    return (
      <div className="favorites">
        <div className="favorite-list">
          <div className="favs-empty">
            <div className="text-big dark-3">Your don't have any favorites</div>
            <FavoritesListIcon className="icon-super-huge dark-3" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="favorite-list">
        <h2 className="title dark-2">Your favorites</h2>
        {favoriteCards}
      </div>
    </div>
  );
}
