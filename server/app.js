import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { products, createSession } from "./stripe.js";
import { verifyUser } from "./firebase.js";

dotenv.config();
const port = parseInt(process.env.PORT);
const clientOrigins = JSON.parse(process.env.CLIENT_ORIGINS);

const app = express();
app.use(cors(clientOrigins));
app.use(express.json());

app.get("/products", async function (req, res) {
  res.json({ products });
});

app.post("/checkout_session", async function (req, res) {
  try {
    const userIdToken = req.body.userIdToken;
    const line_items = req.body.lineItems;

    const { verified, email } = await verifyUser(userIdToken);

    if (verified) {
      const paymentURL = await createSession({
        line_items,
        email,
        success_url: "/payment_success",
        cancel_url: "/checkout",
      });
      res.json({ paymentURL });
    } else {
      res.status(404).end();
    }
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}.`);
});
