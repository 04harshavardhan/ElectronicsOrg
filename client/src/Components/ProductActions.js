import React from "react";

import { useAppState } from "../appState/AppStateProvider";

import { Button } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductActions(product) {
  const {
    state: { cart, favorites },
  } = useAppState();

  let inCart = cart.inCart(product) ? true : false;
  let inFavorites = favorites.includes(product) ? true : false;

  const cartBtn = inCart ? (
    <RemoveFromCartBtn product={product} />
  ) : (
    <AddToCartBtn product={product} />
  );

  const favoritesBtn = inFavorites ? (
    <RemoveFromFavoritesBtn product={product} />
  ) : (
    <AddToFavoritesBtn product={product} />
  );

  const deleteBtn = <DeleteBtn product={product} />;

  return { cartBtn, favoritesBtn, deleteBtn };
}

export function AddToCartBtn({ productId }) {
  const { actions } = useAppState();

  return (
    <Button
      variant="transparent"
      size="regular"
      onClick={() => {
        actions.addToCart(productId);
      }}
    >
      <AddShoppingCartIcon className="icon-big purple" />
    </Button>
  );
}

export function RemoveFromCartBtn({ productId }) {
  const { actions } = useAppState();

  return (
    <Button
      variant="transparent"
      size="regular"
      onClick={() => {
        actions.removeFromCart(productId);
      }}
    >
      <ShoppingCartIcon className="icon-big purple" />
    </Button>
  );
}

export function AddToFavoritesBtn({ productId }) {
  const { actions } = useAppState();

  return (
    <Button
      variant="transparent"
      size="regular"
      onClick={() => {
        actions.addToFavs(productId);
      }}
    >
      <FavoriteBorderIcon className="icon-big purple" />
    </Button>
  );
}

export function RemoveFromFavoritesBtn({ productId }) {
  const { actions } = useAppState();

  return (
    <Button
      variant="transparent"
      size="regular"
      onClick={() => {
        actions.removeFromFavs(productId);
      }}
    >
      <FavoriteIcon className="icon-big purple" />
    </Button>
  );
}

export function DeleteBtn({ productId }) {
  const { actions } = useAppState();

  return (
    <Button
      variant="transparent"
      size="regular"
      onClick={() => {
        actions.removeFromCart(productId);
      }}
    >
      <DeleteIcon className="icon-big red" />
    </Button>
  );
}

export function QuantitySelector({ productId, quantity }) {
  const { actions } = useAppState();
  const style = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px",
    color: "var(--dark-2)",
  };

  return (
    <span className="quantity-selector" style={style}>
      <Button
        variant="outlined-black"
        size="square-small"
        onClick={() => {
          actions.decreaseQuantity(productId);
        }}
      >
        -
      </Button>
      <span>{quantity}</span>
      <Button
        variant="outlined-black"
        size="square-small"
        onClick={() => {
          actions.increaseQuantity(productId);
        }}
      >
        +
      </Button>
    </span>
  );
}
