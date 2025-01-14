import { Document, Schema, model, models } from "mongoose";
import { SubscriptionInterface } from "./subscription"; // Ensure this import is correct

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

// Define the User schema
const userSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // Add validation message
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Add validation message
      unique: true,
      trim: true, // Remove extra spaces
      lowercase: true, // Convert email to lowercase
    },
    password: {
      type: String,
      required: [true, "Password is required"], // Add validation message
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required"], // Add validation message
    },
    profession: {
      type: String,
      required: [true, "Profession is required"], // Add validation message
    },
    rememberMe: {
      type: Boolean,
      default: false, // Default value
    },
    isVerified: {
      type: Boolean,
      default: false, // Default value
    },
    hasCompleteProfile: {
      type: Boolean,
      default: false, // Default value
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default value
    },
    subscriptions: {
      type: [{ type: Schema.Types.ObjectId, ref: "Subscription" }],
      default: [], // Default value (empty array)
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const User = models.User || model<UserInterface>("User", userSchema);

export default User;
