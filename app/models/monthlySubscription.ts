import { Schema, model, models } from "mongoose";
import { PaymentMethod, SubscriptionStatus, SubscriptionType } from "../enums";

const monthlySubscriptionSchema = new Schema({
  subscription_type: {
    type: String,
    enum: Object.values(SubscriptionType),
    required: true,
    default: SubscriptionType.MONTHLY,
  },
  payment_method: {
    type: String,
    enum: Object.values(PaymentMethod),
    required: true,
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  status: {
    type: String,
    enum: Object.values(SubscriptionStatus),
    default: SubscriptionStatus.PENDING,
  },
  notes: { type: String, default: "" },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const MonthlySubscription =
  models.MonthlySubscription ||
  model("MonthlySubscription", monthlySubscriptionSchema);

export default MonthlySubscription;
