import React from "react";

import { signOutUser } from "../firebase";

import { Button } from "react-bootstrap";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

export default function AccountCard({ user, redirect }) {
  return (
    <div className="account">
      <div className="screen-wrapper">
        <div className="card card-white account-card">
          <AccountCircleIcon className="account-icon dark-2" />
          <div className="user-info">
            <span className="user-name text-big dark-2">{user.email}</span>
            <div className="user-actions">
              {user.emailVerified ? (
                <div>
                  <span className="text-2 green">Email Verified</span>
                  <VerifiedUserIcon className="icon-xtra-small green" />
                </div>
              ) : (
                <Button variant="transparent" onClick={redirect}>
                  <span className="text-2 dark-2">Verify email</span>
                  <EmailIcon className="icon-xtra-small dark-2" />
                </Button>
              )}
              <Button variant="transparent" onClick={signOutUser}>
                <span className="text-2 red">Sign Out</span>
                <LogoutIcon className="icon-xtra-small red" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
