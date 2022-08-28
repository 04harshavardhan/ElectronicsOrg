import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { useAppState } from "./appState/AppStateProvider";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Checkout from "./Checkout/Checkout";
import Favorites from "./Favorites/Favorites";
import Account from "./Account/Account";
import AlertBox from "./Components/Alert";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

function App() {
  const {
    state: { user, alert },
  } = useAppState();

  return (
    <BrowserRouter>
      <div className="app">
        <AlertBox alert={alert} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              user ? (
                <>
                  <Header /> <Checkout />
                </>
              ) : (
                <Account />
              )
            }
          />
          <Route
            path="/favorites"
            element={
              user ? (
                <>
                  <Header /> <Favorites />
                </>
              ) : (
                <Account />
              )
            }
          />
          <Route
            path="/account"
            element={
              <>
                <Account />
              </>
            }
          />
          <Route
            path="/payment_success"
            element={
              <>
                <Header />
                <div className="screen-wrapper">
                  <div className="card card-white payment-sucess-card">
                    <CheckCircleRoundedIcon className="icon-super-huge green" />
                    <span className="title dark-2">
                      Your payment was sucessful
                    </span>
                    <span className="text-1 dark-3">Thanks for shopping</span>
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
