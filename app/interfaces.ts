import { Document } from "mongoose";
import { PaymentMethod, SubscriptionStatus, SubscriptionType } from "./enums";

// Base interface for common fields
export interface BaseSubscriptionInterface extends Document {
  notes: string;
  isPaid: boolean;
  createdAt: Date;
}

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
  dailySubscriptions: DailySubscriptionInterface[];
  weeklySubscriptions: WeeklySubscriptionInterface[];
  monthlySubscriptions: MonthlySubscriptionInterface[];
  active_subscription?:
    | DailySubscriptionInterface
    | WeeklySubscriptionInterface
    | MonthlySubscriptionInterface;
}

// Define the DailySubscriptionInterface
export interface DailySubscriptionInterface extends BaseSubscriptionInterface {
  subscription_type: SubscriptionType;
  start_date: Date;
  end_date: Date;
  price: number;
  payment_method: PaymentMethod;
}

// Define the WeeklySubscriptionInterface
export interface WeeklySubscriptionInterface extends BaseSubscriptionInterface {
  subscription_type: SubscriptionType;
  start_date: Date;
  end_date: Date;
  status: SubscriptionStatus;
  payment_method: PaymentMethod;
}

// Define the MonthlySubscriptionInterface
export interface MonthlySubscriptionInterface
  extends BaseSubscriptionInterface {
  subscription_type: SubscriptionType;
  start_date: Date;
  end_date: Date;
  status: SubscriptionStatus;
  payment_method: PaymentMethod;
}
