import React from "react";

import ProductInfoBox from "../Components/ProductInfoBox";
import {
  AddToCartBtn,
  RemoveFromCartBtn,
  AddToFavoritesBtn,
  RemoveFromFavoritesBtn,
} from "../Components/ProductActions";

export default function FavoriteCard({ product, inCart, inFavs }) {
  const CartBtn = !inCart ? AddToCartBtn : RemoveFromCartBtn;
  const FavoritesBtn = !inFavs ? AddToFavoritesBtn : RemoveFromFavoritesBtn;

  return (
    <div className="favorite-card">
      <img className="product-img" src={product.image} alt={product.name} />
      <ProductInfoBox product={product}>
        <CartBtn productId={product.id} />
        <FavoritesBtn productId={product.id} />
      </ProductInfoBox>
    </div>
  );
}
