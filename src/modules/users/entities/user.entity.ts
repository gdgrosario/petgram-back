import { Prop, Schema } from "@nestjs/mongoose";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString
} from "class-validator";
import { Document } from "mongoose";
import { MediaType } from '../../cloudinary/cloudinary.schema';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
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

  @Prop()
  avatar:MediaType

  @Prop()
  banner: MediaType;
  
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

  @Prop({ required: true, unique: true })
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
