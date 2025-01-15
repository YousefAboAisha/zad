import { Schema, model, models } from "mongoose";
import { SubscriptionInterface } from "@/app/interfaces";

// Define the Subscription schema
const subscriptionSchema = new Schema<SubscriptionInterface>({
  leasing_type: { type: String, required: true },
  start_date: { type: String, required: true },
  end_date: { type: String, required: true },
  payment_method: { type: String, required: true },
  notes: { type: String, default: "" },
  isLastingCustomer: { type: Boolean, default: false },
  room_id: { type: String, required: true, default: "" },
  seat_id: { type: String, required: true, default: "" },
  status: { type: String, required: true, default: "0" },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists, otherwise create it
const Subscription =
  models.Subscription ||
  model<SubscriptionInterface>("Subscription", subscriptionSchema);

export default Subscription;
