import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import { useAppState } from "../appState/AppStateProvider";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import logo from "../Assets/logo.svg";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import FavoritesListIcon from "../Components/FavoritesListIcon";

export default function Header() {
  const {
    state: { cart, user },
  } = useAppState();
  let title;

  if (user) {
    title = user.email;
  } else {
    title = (
      <Link to="/account" className="underlined">
        Sign In
      </Link>
    );
  }

  return (
    <Navbar variant="dark" expand="md" sticky="top" className="navbar">
      <Navbar.Brand>
        <Link to="/">
          <img src={logo} alt="logo" className="brand-logo"></img>
        </Link>
      </Navbar.Brand>
      {NavbarSearch()}
      <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title className="text-big purple">{title}</Offcanvas.Title>
          <Navbar.Toggle aria-controls="offcanvasNavbar">
            <CloseIcon className="close-icon icon-big" />
          </Navbar.Toggle>
        </Offcanvas.Header>
        <Offcanvas.Body className="justify-content-end">
          <Nav>
            <Nav.Item>
              <Link to="/checkout" className="navigation-link checkout-link">
                <div className="shopping-cart-icon">
                  <span className="basket-count">{cart.length}</span>
                  <ShoppingCartIcon className="icon-big "></ShoppingCartIcon>
                </div>
                <p className="link-text d-md-none">Cart</p>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/favorites" className="navigation-link">
                <FavoritesListIcon className="icon-big"></FavoritesListIcon>
                <p className="link-text d-md-none">Favourites</p>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/account" className="navigation-link">
                <ManageAccounts className="icon-big"></ManageAccounts>
                <p className="link-text d-md-none">Account</p>
              </Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
      <Navbar.Toggle aria-controls="offcanvasNavbar">
        <MoreHorizIcon className="icon-big" />
      </Navbar.Toggle>
    </Navbar>
  );
}

function NavbarSearch() {
  const searchBar = (
    <FormControl
      type="search"
      placeholder="Search"
      aria-label="Search"
      className="search-bar d-none d-md-block"
    />
  );

  return (
    <Form className="navbar-search">
      {searchBar}
      <Button variant="purple" className="search-btn">
        <SearchIcon className="search-icon icon-small" />
      </Button>
    </Form>
  );
}
