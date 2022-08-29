import React, { useState } from "react";
import "./Checkout.css";

import { useAppState } from "../appState/AppStateProvider";
import CartItem from "./CartItem";
import CheckoutSubtotal from "./CheckoutSubtotal";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import stripePayment from "./payment";

export default function Checkout() {
  const {
    state: { cart, userIdToken, user },
    actions: { getProduct, makeAlert },
  } = useAppState();

  const [processing, setProcessing] = useState(false);

  const cartIsEmpty = cart.length === 0;

  let numOfItems = 0;
  let total = 0;

  const checkoutItems = [];

  const cartItems = cart.map((item, i) => {
    const product = getProduct(item.productId);
    if (product === undefined) {
      return <></>;
    }

    const quantity = item.quantity;

    numOfItems += quantity;
    total += product.price * quantity;

    checkoutItems.push({
      product,
      quantity,
    });

    return <CartItem product={product} quantity={quantity} key={i} />;
  });

  function handlePayment() {
    const callBack = () => {
      setProcessing(() => false);
    };

    setProcessing(() => true);
    stripePayment({ user, userIdToken, checkoutItems, callBack, makeAlert });
  }

  if (cartIsEmpty) {
    return (
      <div className="checkout">
        <div className="checkout-cart">
          <div className="cart-empty">
            <div className="text-big dark-3">Your cart is empty</div>
            <ShoppingCartOutlinedIcon className="icon-super-huge dark-3" />
          </div>
        </div>
        <CheckoutSubtotal
          numOfItems={numOfItems}
          total={total}
          pay={handlePayment}
          disabled={cartIsEmpty || processing}
          cartIsEmpty={cartIsEmpty}
          processing={processing}
        />
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout-cart">
        <h2 className="title dark-2">Your cart</h2>
        {cartItems}
      </div>
      <CheckoutSubtotal
        numOfItems={numOfItems}
        total={total}
        pay={handlePayment}
        disabled={cartIsEmpty || processing}
        cartIsEmpty={cartIsEmpty}
        processing={processing}
      />
    </div>
  );
}
