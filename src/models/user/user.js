import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  favorites: {
    type: [String],
    default: [],
  },
  cart: [],
  history: [],
  theme: {
    type: String,
    default: "light",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
