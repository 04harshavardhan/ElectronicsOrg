import React from "react";
import "./Home.css";

import { useAppState } from "../appState/AppStateProvider";
import ProductCard from "./ProductCard";

import Spinner from "react-bootstrap/Spinner";

export default function Home() {
  const {
    state: { products, loadingProducts },
    actions: { checkInCart, checkInFavs },
  } = useAppState();

  const ProductsCards = products.map((product, i) => {
    const inCart = checkInCart(product.id);
    const inFavs = checkInFavs(product.id);

    return (
      <ProductCard
        product={product}
        inCart={inCart}
        inFavs={inFavs}
        key={i}
      ></ProductCard>
    );
  });

  return (
    <div className="home">
      <div className="product-grid">
        <div className="product-row">
          {loadingProducts ? (
            <div className="spinner-container">
              <Spinner animation="border" className="purple" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            ProductsCards
          )}
        </div>
      </div>
    </div>
  );
}
