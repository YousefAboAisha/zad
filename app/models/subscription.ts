import { Schema, model, models } from "mongoose";

// Define the subscriptionSchema schema
const subscriptionSchema = new Schema({
  customer_id: {
    type: String,
    required: true,
  },
  subscription_type: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
    unique: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  payment_method: {
    type: Number,
    required: true,
  },
  isLastingCustomer: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists, otherwise create it
const Subscription =
  models.Subscription || model("Subscription", subscriptionSchema);

export default Subscription;
