async function stripePayment({
  user,
  userIdToken,
  checkoutItems,
  callBack,
  makeAlert,
}) {
  if (!user.emailVerified) {
    makeAlert("Verify your email to continue");
    callBack();
    return;
  }

  const lineItems = checkoutItems.map(({ product, quantity }) => ({
    price: product.priceId,
    quantity,
  }));

  try {
    const querry = await fetch("http://localhost:4000/checkout_session", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIdToken, lineItems }),
    });

    if (!querry.ok) {
      makeAlert("Error! Could not redirect...");
    }
    const { paymentURL } = await querry.json();

    window.location.href = paymentURL;
  } catch (e) {
    console.error(e);
    callBack();
  }
}

export default stripePayment;
