import { Schema, model, models } from "mongoose";

// Define the User schema
const userSchema = new Schema({
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
  leasingType: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists, otherwise create it
const User = models.User || model("User", userSchema);

export default User;
