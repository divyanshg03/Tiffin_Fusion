const express = require('express');
const router = express.Router();
const stripe = require('stripe')(''); // Add your stripe secret key here

router.post('/create-payment-intent', async (req, res) => {
    const { amount, currency} = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
            payment_method_types: ['card'],
        });

        res.send({
            client_secret: paymentIntent.client_secret,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;