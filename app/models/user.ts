import { Document, Schema, model, models } from "mongoose";

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
}

// Define the User schema
const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  rememberMe: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  hasCompleteProfile: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists, otherwise create it
const User = models.User || model<UserInterface>("User", userSchema);

export default User;
