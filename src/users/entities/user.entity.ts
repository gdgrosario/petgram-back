import { genSalt, hash, compare } from "bcrypt";
import { Document } from "mongoose";

export class User extends Document {
  _id: string;
  nickname: string;
  name: string;
  birthday: string;
  pictureProfile: string;
  bannerProfile: string;
  biography: string;
  numberOfPosts: number;
  numberOfFollowers: number;
  numberOfFollowed: number;
  email: string;
  password: string;
  raza: string;
  sexo: string;
  phoneNumber: string;

  async hashPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await compare(password, this.password);
  }
}
