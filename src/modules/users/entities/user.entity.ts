import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsDate, IsNumber } from "class-validator";
import { Schema, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema()
export class User extends Document {
  @Prop({ required: true, unique:true })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({ required: true })
  @IsDate()
  @IsNotEmpty()
  birthday: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  pictureProfile: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  bannerProfile: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  biography: string;

  @Prop({ default: 0 })
  @IsNumber()
  @IsNotEmpty()
  numberOfPosts: number;

  @Prop({ default: 0 })
  @IsNumber()
  @IsNotEmpty()
  numberOfFollowers: number;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  numberOfFollowed: number;

  @Prop({ required: true, unique: true})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  raza: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  sexo: string;

  @Prop({ required: true })
  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  role: string;
}
