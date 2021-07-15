import { Schema, model, Document } from "mongoose";

/* User interface */
export interface IUser extends Document {
  email: string,
  password: string,
  name: string,
  phone: string,
}

/* User schema */
export const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  name: { type: String },
  phone: { type: String },
});

/* User model */
export const User = model<IUser>("user", UserSchema);
