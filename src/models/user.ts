import { Schema, model } from "mongoose";

/* User schema */
export const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  name: { type: String },
  phone: { type: String },
});

/* User model */
export const User = model<IUser>("user", UserSchema);
