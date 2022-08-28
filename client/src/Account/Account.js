import React from "react";
import { useState } from "react";

import Header from "../Header/Header";

import logo from "../Assets/logo.svg";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import "./Account.css";

import { useAppState } from "../appState/AppStateProvider";

import AccountCard from "./AccountCard";
import EmailVerificationPage from "./EmailVerificationPage";
import SignUpPage from "./SignUpPage";
import SignInPage from "./SignInPage";

export default function Account(
  { signIn = false, signUp = false, emailVerification = false } = {
    signIn: false,
    signUp: false,
    emailVerification: false,
  }
) {
  const {
    state: { user, loadingUser },
  } = useAppState();

  const [signInPage, setSignInPage] = useState(signIn);
  const [signUpPage, setSignUpPage] = useState(signUp);
  const [emailVerificationPage, setEmailVerificationPage] =
    useState(emailVerification);

  function redirectPage(page = "") {
    setSignUpPage(false);
    setSignInPage(false);
    setEmailVerificationPage(false);

    switch (page) {
      case "sign-up":
        setSignUpPage(true);
        break;
      case "sign-in":
        setSignInPage(true);
        break;
      case "email-verification":
        setEmailVerificationPage(true);
        break;
      default:
        break;
    }
  }

  if (loadingUser) {
    return (
      <div className="screen-wrapper">
        <Spinner animation="border" className="dark-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (user) {
    if (emailVerificationPage && !user.emailVerified) {
      return (
        <div className="screen-wrapper">
          <EmailVerificationPage
            redirect={() => {
              redirectPage("sign-up");
            }}
          />
        </div>
      );
    }

    return (
      <>
        <Header />
        <AccountCard
          user={user}
          redirect={() => {
            redirectPage("email-verification");
          }}
        />
      </>
    );
  }

  if (signInPage) {
    return (
      <div className="screen-wrapper">
        <SignInPage
          redirect={() => {
            redirectPage("sign-up");
          }}
          next={() => {
            redirectPage("email-verification");
          }}
        />
      </div>
    );
  }

  if (signUpPage) {
    return (
      <div className="screen-wrapper">
        <SignUpPage
          redirect={() => {
            redirectPage("sign-in");
          }}
          next={() => {
            redirectPage("email-verification");
          }}
        />
      </div>
    );
  }

  return (
    <div className="screen-wrapper">
      <div className="card card-dark">
        <img src={logo} alt="logo" className="card-logo" />
        <Button
          variant="outlined-white"
          size="rect-big"
          onClick={() => {
            setSignInPage(true);
            setSignUpPage(false);
          }}
        >
          Sign In
        </Button>
        <Button
          variant="white"
          size="rect-big"
          onClick={() => {
            setSignUpPage(true);
            setSignInPage(false);
          }}
        >
          Sign Up
        </Button>
        <span className="card-bottom">
          <Link to="/" className="text-2">
            Skip for now
          </Link>
        </span>
      </div>
    </div>
  );
}
