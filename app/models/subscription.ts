import { Schema, model, models } from "mongoose";
import { PaymentMethod, SubscriptionStatus, SubscriptionType } from "../enums";
import { SubscriptionInterface } from "../interfaces";

// Define the Subscription schema
const SubscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  subscription_type: {
    type: String,
    enum: Object.values(SubscriptionType),
    required: true,
  },

  status: {
    type: String,
    enum: Object.values(SubscriptionStatus),
    required: true,
    default: SubscriptionStatus.PENDING,
  },

  start_date: { type: Date, required: true },

  end_date: { type: Date, required: true },

  price: { type: Number, required: true },

  payment_method: {
    type: String,
    enum: Object.values(PaymentMethod),
    required: true,
  },

  notes: { type: String, default: "" },

  isPaid: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists, otherwise create it
const Subscription =
  models.Subscription ||
  model<SubscriptionInterface>("DailySubscription", SubscriptionSchema);

export default Subscription;
