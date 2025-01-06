import { Schema, model, models } from "mongoose";

// Define the User schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists, otherwise create it
const User = models.User || model("User", userSchema);

export default User;
