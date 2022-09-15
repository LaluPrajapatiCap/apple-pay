const express = require('express');
const cors = require('cors');
const {resolve} = require('path');
const env = require('dotenv').config({path: './.env'});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('I am starting my development')
});

// app.post('/payment', (req,res) => {
//   const { product, token } = req.body;
//   console.log("PRODUCT", product);
//   console.log("PRICE", product.price);

//   return stripe.customers.create({
//     email: token.email,
//     source: token.id
//   }).then( customer => {
//     stripe.charges.create({
//       amount: 3999,
//       currency: 'usd',
//       customer: customer.id,
//       receipt_email: token.email,
//       description: `purchase of ${product.name}`,
//       shipping: {
//         name: token.card.name,
//         address: {
//           country: token.card.address_country
//         }
//       }
//     })
//   })
//   .then(result => res.status(200).json(result))
//   .catch(err => console.log(err))
// });


app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodType, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1900,
      currency,
      payment_method_types: [paymentMethodType],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({ error: { message: e.message}})
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))