import React from "react";
import "./ProductInfoBox.css";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export default function ProductInfoBox({ product, children }) {
  return (
    <div className="info-box">
      <div className="info-details">
        <span className="text-2 dark-2">{product.name}</span>
        <Rating rating={product.rating} />
      </div>
      <div className="product-options">
        <span className="text-1 dark-2">
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </span>
        <div className="product-actions">{children}</div>
      </div>
    </div>
  );
}

function Rating({ rating }) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    let star =
      i < rating ? (
        <StarIcon className="icon-small star-icon" key={i}></StarIcon>
      ) : (
        <StarBorderIcon
          className="icon-small star-icon"
          key={i}
        ></StarBorderIcon>
      );

    stars.push(star);
  }

  return <div className="product-rating">{stars}</div>;
}
