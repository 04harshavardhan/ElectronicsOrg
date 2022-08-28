import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import dotenv from "dotenv";
dotenv.config();

initializeApp({
  credential: applicationDefault(),
});

export async function verifyUser(idToken) {
  const { uid, email_verified, email } = await getAuth().verifyIdToken(idToken);

  if (!uid || !email_verified) {
    return { verified: false };
  } else {
    return { verified: true, email };
  }
}
