import { Document } from "mongoose";

// Define the User interface
export interface UserInterface extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  profession: string;
  rememberMe: boolean;
  isVerified: boolean;
  hasCompleteProfile: boolean;
  createdAt: Date;
  subscriptions: SubscriptionInterface[]; // Array of subscription objects
}

// Define the SubscriptionInterface
export interface SubscriptionInterface extends Document {
  leasing_type: string;
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
