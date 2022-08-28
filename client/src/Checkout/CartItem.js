import React from "react";
import "./CartItem.css";

import ProductInfoBox from "../Components/ProductInfoBox";
import { QuantitySelector, DeleteBtn } from "../Components/ProductActions";

export default function CartItem({ product, quantity }) {
  return (
    <div className="cart-item">
      <img src={product.image} alt={product.name} className="product-img" />
      <ProductInfoBox product={product}>
        <QuantitySelector productId={product.id} quantity={quantity} />
        <DeleteBtn productId={product.id} />
      </ProductInfoBox>
    </div>
  );
}
