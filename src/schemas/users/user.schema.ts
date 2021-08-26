import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export class User {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthday: string;

  @Prop()
  pictureProfile: string;

  @Prop()
  bannerProfile: string;

  @Prop()
  biography: string;

  @Prop()
  numberOfPosts: number;

  @Prop()
  numberOfFollowers: number;

  @Prop()
  numberOfFollowed: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  raza: string;

  @Prop({ required: true })
  sexo: string;

  @Prop()
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
