const stripe = require('stripe')("sk_test_51IYB3kKHE4A4HHrOUKXd5GZqbWNq1QSmWvqY2al9fB1K2XCKk3vlC7N0e8Ob20IZVLEYrExnMZycwBlTKPuyrnNY001cANctnM");

const initiateStripeSession = async (req) => {

  // console.log(req.user);

  const priceDataArray = [];

  priceDataArray.push({
    price_data: {
      currency: "eur",
      product_data: {
        name: "Abonnement",
      },
      unit_amount: req.body.price * 100,
    },
    quantity: 1,
  });

  // req.body.cart.forEach((element) => {
  //   priceDataArray.push({
  //     price_data: {
  //       currency: "eur",
  //       product_data: {
  //         name: element.title,
  //       },
  //       unit_amount: element.price * 100,
  //     },
  //     quantity: element.qty,
  //   });
  // });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: priceDataArray,
    payment_intent_data: {
      // metadata: { userId: req.user.id, cart: JSON.stringify(req.body.cart) },
    },
    mode: "payment",
    // success_url: `http://localhost:3000/confirmation`,
    success_url: `https://fullstack-front-nper4ad6s-thomaspomart-ynovcom.vercel.app/login`,
    cancel_url: `https://fullstack-front-nper4ad6s-thomaspomart-ynovcom.vercel.app/cancel`,
  });
  return session;
};

exports.createSession = async function (req, res) {
  try {
    const session = await initiateStripeSession(req);
    res.status(200).json({
      id: session.id,
      price: session.amout_total,
      currency: session.currency,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};