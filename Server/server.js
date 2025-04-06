const express = require('express');
const stripe = require('stripe')(''); // Add your stripe secret key here
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());j

app.use('/payment', paymentRoutes);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});