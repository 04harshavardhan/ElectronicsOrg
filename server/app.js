import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { products, createSession } from "./stripe.js";
import { verifyUser } from "./firebase.js";

dotenv.config();
const clientOrigin1 = process.env.CLIENT_ORIGIN_1;
const clientOrigin2 = process.env.CLIENT_ORIGIN_2;

const app = express();
app.use(
  cors({
    clientOrigin1,
    clientOrigin2,
  })
);
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

app.listen(4000, function () {
  console.log("Listening on port 4000. Go to http://localhost:4000");
});
