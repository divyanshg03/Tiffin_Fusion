import { Subscriber } from '../models/sub.model.js';

export const subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Email regex pattern to validate the format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if email is valid
    if (!emailPattern.test(email)) {
      return res.status(400).send('Invalid email format');
    }

    // Check if the email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(409).send('Email is already subscribed');
    }

    // Create a new subscriber
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(200).send('Subscription successful');
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).send('Error subscribing. Please try again later.');
  }
}