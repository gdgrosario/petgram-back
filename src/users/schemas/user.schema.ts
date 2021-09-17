import { Schema } from "mongoose";

export const UserSchema = new Schema({
  nickname: {
    type: String,
    unique: true
  },
  name: String,
  birthday: String,
  pictureProfile: String,
  bannerProfile: String,
  biography: String,
  numberOfPoStS: Number,
  numberOfFollowerS: Number,
  numberOfFollowed: Number,
  email: {
    type: String,
    unique: true
  },
  password: String,
  raza: String,
  Sexo: String,
  phoneNumber: String
});
