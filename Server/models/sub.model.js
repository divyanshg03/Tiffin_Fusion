import { Schema, model } from 'mongoose';

const subscriberSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

export const Subscriber = model('Subscriber', subscriberSchema);