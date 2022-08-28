import dotenv from "dotenv";
import stripe from "stripe";

dotenv.config();
const clientOrigin = process.env.CLIENT_ORIGIN;
const stripe_key = process.env.STRIPE_SECRET;

const stripe_api = stripe(stripe_key);

const productData = await stripe_api.products.list();

const products = [];

for (const i in productData.data) {
  if (Object.hasOwnProperty.call(productData.data, i)) {
    const data = productData.data[i];

    const price = await stripe_api.prices.retrieve(data.default_price);

    products.push({
      id: data.id,
      name: data.name,
      price: price.unit_amount / 100, // 100 unit amount = 1 in currency
      priceId: data.default_price,
      rating: parseFloat(data.metadata.rating),
      image: data.images[0],
    });
  }
}

async function getPaymentLink(line_items) {
  const paymentLink = await stripe_api.paymentLinks.create({ line_items });
  return paymentLink;
}

export async function createSession({
  line_items,
  email,
  success_url,
  cancel_url,
}) {
  const session = await stripe_api.checkout.sessions.create({
    success_url: clientOrigin + success_url,
    cancel_url: clientOrigin + cancel_url,
    line_items,

    mode: "payment",
    customer_email: email,
  });

  return session.url;
}

export { products, getPaymentLink };
