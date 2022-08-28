import React, { useState } from "react";

import { useAppState } from "../appState/AppStateProvider";

import { sendEmailVerification } from "firebase/auth";
import { signOutUser } from "../firebase";

import Button from "react-bootstrap/Button";

import EditIcon from "@mui/icons-material/Edit";

export default function EmailVerificationPage({ redirect }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    state: { user },
  } = useAppState();

  async function sendMail() {
    setSending(() => true);

    sendEmailVerification(user, {
      url: "https://electronicsorg-e1ab1.web.app/account",
    })
      .then(() => {
        setSending(() => false);
        setSent(true);
      })
      .catch((error) => {});
  }

  if (sent) {
    return (
      <div className="card card-dark email-verification-card">
        <div className="content">
          <span className="text-2 grey-mild">
            A verification mail was sent to your email
          </span>
          <span className="text-1 grey-white">
            {" " + user.email}
            <Button
              variant="link"
              onClick={() => {
                signOutUser();
                redirect();
              }}
            >
              <span className="visually-hidden">Edit email</span>
              <EditIcon className="icon-xtra-small grey-mild" />
            </Button>
          </span>
          <span className="text-2 grey-mild">
            (check your inbox and spam folder)
          </span>
          <Button
            variant="purple"
            size="rect-big"
            className="w-100 action-btn"
            onClick={sendMail}
            disabled={sending}
          >
            Resend
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        sending
          ? "card-loading card card-dark email-verification-card"
          : "card card-dark email-verification-card"
      }
    >
      <div className="content">
        <span className="text-2 grey-mild">Verify your email</span>
        <span className="text-1 grey-white">
          {" " + user.email}
          <Button
            variant="link"
            onClick={() => {
              signOutUser();
              redirect();
            }}
          >
            <span className="visually-hidden">Edit email</span>
            <EditIcon className="icon-xtra-small grey-mild" />
          </Button>
        </span>
        <Button
          variant="purple"
          size="rect-big"
          className="w-100 action-btn"
          onClick={sendMail}
          disabled={sending}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
