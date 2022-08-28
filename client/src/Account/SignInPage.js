import React from "react";
import { useState } from "react";

import { signIn } from "../firebase";

import logo from "../Assets/logo.svg";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

import "./Account.css";

export default function SignInPage({ redirect, next }) {
  const [signingin, setSigningIn] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValidPassword, setValidPassword] = useState(true);

  function validateEmail(emailValue) {
    let emailIsValid = /^[A-Za-z0-9+-._]+@[A-Za-z0-9+-._]+$/m.test(emailValue);
    let emailErrorMessage = emailIsValid ? "" : "Enter a valid email";

    if (emailValue === "") {
      emailErrorMessage = "Please enter your email";
    }

    return { emailIsValid, emailErrorMessage };
  }

  function validatePassword(passwordValue) {
    if (passwordValue !== "") {
      return { passwordIsValid: true, passwordErrorMessage: "" };
    }
    const passwordIsValid = false;
    const passwordErrorMessage = "Please enter a password";

    return { passwordIsValid, passwordErrorMessage };
  }

  function handleSubmit() {
    const { emailIsValid, emailErrorMessage } = validateEmail(email);
    const { passwordIsValid, passwordErrorMessage } =
      validatePassword(password);

    if (emailIsValid && passwordIsValid) {
      setSigningIn(() => true);
      signIn({ email, password, next, error: handleError });
    }

    if (!emailIsValid) {
      setEmailError(() => emailErrorMessage);
      setValidEmail(() => false);
    }
    if (!passwordIsValid) {
      setPasswordError(() => passwordErrorMessage);
      setValidPassword(() => false);
    }
  }

  function handleError(errorCode) {
    switch (errorCode) {
      case "auth/user-not-found":
        setValidEmail(() => false);
        setEmailError("user not found");
        break;
      case "auth/wrong-password":
        setValidPassword(() => false);
        setPasswordError("wrong password");
        break;
      default:
        setValidEmail(() => false);
        setEmailError(errorCode);
        break;
    }

    setSigningIn(() => false);
  }

  const cardClass = signingin ? "card-disabled" : "";
  const emailClass = isValidEmail ? "" : "input-red";
  const passwordClass = isValidPassword ? "" : "input-red";

  return (
    <div className={"card card-dark " + cardClass}>
      <img src={logo} alt="logo" className="card-logo" />
      <Form className="card-form">
        <FloatingLabel
          controlId="email"
          label="email"
          className={"input-feild " + emailClass}
        >
          <Form.Control
            type={email}
            placeholder="email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              const { emailIsValid } = validateEmail(value);

              if (emailIsValid) {
                setEmailError("");
                setValidEmail(true);
              }

              setEmail(value);
            }}
          />

          <Form.Text>{emailError}</Form.Text>
        </FloatingLabel>
        <FloatingLabel
          controlId="password"
          label="password"
          className={"input-feild " + passwordClass}
        >
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPasswordError("");
              setValidPassword(true);
              setPassword(value);
            }}
          />

          <Form.Text>{passwordError}</Form.Text>
        </FloatingLabel>

        <Button
          variant="purple"
          size="rect-big"
          type="submit"
          className="w-100"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Continue
        </Button>
      </Form>
      <div className="card-bottom">
        <span className="text-2 grey-mild">Don't have an account yet?</span>
        <Button variant="link" className="text-2 grey-white" onClick={redirect}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
