import { Document, Types } from "mongoose";
import {
  PaymentMethod,
  Role,
  SubscriptionStatus,
  SubscriptionType,
} from "./enums";

// Define the User interface
export interface UserInterface extends Document {
  name: string;
  email: string;
  phoneNumber: number;
  profession: string;
  password: string;
  notes: string;
  rememberMe: boolean;
  isActive: boolean;
  hasCompleteProfile: boolean;
  createdAt: Date;
  active_subscription?: SubscriptionInterface;
  role: Role;
}

// Define the Subscription interface
export interface SubscriptionInterface extends Document {
  user: Types.ObjectId; // Reference to User
  subscription_type: SubscriptionType;
  status: SubscriptionStatus;
  start_date: Date;
  end_date: Date;
  payment_method: PaymentMethod;
  notes: string;
  isPaid: boolean;
  createdAt: Date;
  price: number;
}

export interface SubscriberData {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string; // Optional if phone may not always exist
  profession: string;
}

export interface SubscriptionRequestsTableInterface {
  data: (SubscriptionInterface & {
    user: SubscriberData;
  })[];
  fetchData?: () => void;
}
