import { Schema, model } from 'mongoose';

/* User schema */
export const UserSchema: Schema<IUser> = new Schema({
  email: { type: String },
  password: { type: String },
  name: { type: String },
  phone: { type: String }
});

UserSchema.method('toJSON', function () {
  const { __v, password, ...object } = this.toObject();
  return object;
});

/* User model */
export const User = model<IUser>('user', UserSchema);
