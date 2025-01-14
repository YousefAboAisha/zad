import { Schema, model, models } from "mongoose";

export interface SubscriptionInterface extends Document {
  customer_id: string;
  subscription_type: string;
  start_date: string;
  end_date: string;
  payment_method: string;
  notes: string;
  isLastingCustomer: boolean;
  room_id: string;
  seat_id: string;
  status: string;
  createdAt: Date;
}

// Define the subscriptionSchema schema
const subscriptionSchema = new Schema<SubscriptionInterface>({
  customer_id: {
    type: String,
    required: true,
    unique: true,
  },
  subscription_type: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
    default: "",
  },
  isLastingCustomer: {
    type: Boolean,
    default: false,
  },
  room_id: {
    type: String,
    default: "",
  },
  seat_id: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "0",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists, otherwise create it
const Subscription =
  models.Subscription ||
  model<SubscriptionInterface>("Subscription", subscriptionSchema);

export default Subscription;
