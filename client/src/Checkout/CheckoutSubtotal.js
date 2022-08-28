import React from "react";
import "./CheckoutSubtotal.css";

import Button from "react-bootstrap/Button";

export default function CheckoutSubtotal({ numOfItems, total, disabled, pay }) {
  return (
    <div className="checkout-subtotal">
      <div>
        <span>Items</span>
        <span className="num-of-items">{numOfItems}</span>
      </div>
      <div>
        <span>Total</span>
        <strong className="Total">
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </strong>
      </div>
      <Button
        variant="purple"
        className="checkout-btn"
        disabled={disabled}
        onClick={pay}
      >
        Proceed to checkout
      </Button>
    </div>
  );
}
