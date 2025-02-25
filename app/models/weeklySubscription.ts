import { Schema, model, models } from "mongoose";
import { WeeklySubscriptionInterface } from "../interfaces";
import { PaymentMethod, SubscriptionStatus, SubscriptionType } from "../enums";

const weeklySubscriptionSchema = new Schema({
  subscription_type: {
    type: String,
    enum: Object.values(SubscriptionType),
    required: true,
    default: SubscriptionType.WEEKLY,
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(SubscriptionStatus),
    default: SubscriptionStatus.PENDING,
  },
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
const WeeklySubscription =
  models.WeeklySubscription ||
  model<WeeklySubscriptionInterface>(
    "WeeklySubscription",
    weeklySubscriptionSchema
  );

export default WeeklySubscription;
