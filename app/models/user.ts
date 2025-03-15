import { Schema, model, models } from "mongoose";
import { UserInterface } from "@/app/interfaces";

// Define the User schema
const userSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: [true, "Name is required and cannot be empty."],
    },

    email: {
      type: String,
      required: [true, "Email is required and cannot be empty."],
      unique: true,
      trim: true, // Remove extra spaces
      lowercase: true, // Convert email to lowercase
    },

    password: {
      type: String,
      required: [true, "Password is required and cannot be empty."],
    },

    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required and cannot be empty."],
    },

    profession: {
      type: String,
      required: [true, "Profession is required and cannot be empty."],
    },

    rememberMe: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    hasCompleteProfile: {
      type: Boolean,
      default: false,
    },

    active_subscription: { type: Schema.Types.ObjectId, ref: "Subscription" },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Check if the model already exists, otherwise create it
const User = models.User || model<UserInterface>("User", userSchema);

export default User;
