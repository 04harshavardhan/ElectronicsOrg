import React from "react";
import { useState } from "react";

import { signUp } from "../firebase";

import logo from "../Assets/logo.svg";

import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

export default function SignUpPage({ redirect, next }) {
  const [signingUp, setSigningUp] = useState(false);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValidPassword, setValidPassword] = useState(true);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isValidConfirmPassword, setValidConfirmPassword] = useState(true);

  function validateEmail(emailValue) {
    let emailIsValid = /^[A-Za-z0-9+-._]+@[A-Za-z0-9+-._]+$/m.test(emailValue);
    let emailErrorMessage = emailIsValid ? "" : "Enter a valid email";

    if (emailValue === "") {
      emailErrorMessage = "Please enter your email";
    }

    return { emailIsValid, emailErrorMessage };
  }

  function validatePassword(passwordValue) {
    let passwordIsValid = passwordValue.length >= 6;
    let passwordErrorMessage = "Atleast 6 characters";

    if (passwordValue === "") {
      passwordIsValid = false;
      passwordErrorMessage = "Please enter a password";
    }

    return { passwordIsValid, passwordErrorMessage };
  }

  function validateConfirmPassword(confirmPasswordValue) {
    let confirmPasswordIsValid = confirmPasswordValue === password;
    let confirmPasswordErrorMessage = confirmPasswordIsValid
      ? ""
      : "Passwords don't match";

    return { confirmPasswordIsValid, confirmPasswordErrorMessage };
  }

  function handleSubmit() {
    const { emailIsValid, emailErrorMessage } = validateEmail(email);
    const { passwordIsValid, passwordErrorMessage } =
      validatePassword(password);
    const { confirmPasswordIsValid, confirmPasswordErrorMessage } =
      validateConfirmPassword(confirmPassword);

    if (emailIsValid && passwordIsValid && confirmPasswordIsValid) {
      setSigningUp(() => true);

      signUp({ email, password, next, error: handleError });
    }

    if (!emailIsValid) {
      setEmailError(() => emailErrorMessage);
      setValidEmail(() => false);
    }
    if (!passwordIsValid) {
      setPasswordError(() => passwordErrorMessage);
      setValidPassword(() => false);
    }
    if (!confirmPasswordIsValid) {
      setConfirmPasswordError(() => confirmPasswordErrorMessage);
      setValidConfirmPassword(() => false);
    }
  }

  function handleError(errorCode) {
    switch (errorCode) {
      case "auth/email-already-in-use":
        setValidEmail(() => false);
        setEmailError("email already in use");
        break;
      case "auth/invalid-email":
        setValidEmail(() => false);
        setEmailError("invalid email");
        break;
      default:
        break;
    }

    setSigningUp(() => false);
  }

  const cardClass = signingUp ? "card-disabled" : "";
  const emailClass = isValidEmail ? "" : "input-red";
  const passwordClass = isValidPassword ? "" : "input-red";
  const confirmPasswordClass = isValidConfirmPassword ? "" : "input-red";

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
            type="email"
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
              const { passwordIsValid } = validatePassword(value);

              if (passwordIsValid) {
                setPasswordError("");
                setValidPassword(true);
              }

              setPassword(value);
            }}
          />

          <Form.Text>{passwordError}</Form.Text>
        </FloatingLabel>
        <FloatingLabel
          controlId="confirmPassword"
          label="confirm password"
          className={"input-feild " + confirmPasswordClass}
        >
          <Form.Control
            type="password"
            placeholder="password"
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              const { confirmPasswordIsValid } = validateConfirmPassword(value);

              if (confirmPasswordIsValid) {
                setConfirmPasswordError("");
                setValidConfirmPassword(true);
              }

              setConfirmPassword(value);
            }}
          />

          <Form.Text>{confirmPasswordError}</Form.Text>
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
        <span className="text-2 grey-mild">Already a customer?</span>
        <Button variant="link" className="text-2 grey-white" onClick={redirect}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
