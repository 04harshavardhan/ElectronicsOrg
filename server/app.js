import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { products, createSession } from "./stripe.js";
import { verifyUser } from "./firebase.js";

dotenv.config();
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
      console.log("not verfified");
      res.status(404).end();
    }
  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
});

app.listen(8080, function () {
  console.log(`App started successfully`);
});
