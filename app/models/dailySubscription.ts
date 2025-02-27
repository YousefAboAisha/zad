import { Schema, model, models } from "mongoose";
import { DailySubscriptionInterface } from "../interfaces";
import { PaymentMethod, SubscriptionStatus, SubscriptionType } from "../enums";

// Define the Subscription schema
const dailySubscriptionSchema = new Schema({
  subscription_type: {
    type: String,
    enum: Object.values(SubscriptionType),
    required: true,
    default: SubscriptionType.DAILY,
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  price: { type: Number, required: true },
  payment_method: {
    type: String,
    enum: Object.values(PaymentMethod),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(SubscriptionStatus),
    required: true,
    default: SubscriptionStatus.PENDING,
  },
  notes: { type: String, default: "" },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists, otherwise create it
const DailySubscription =
  models.DailySubscription ||
  model<DailySubscriptionInterface>(
    "DailySubscription",
    dailySubscriptionSchema
  );

export default DailySubscription;
