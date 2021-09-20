import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ unique: true })
  nickname: String;
  @Prop()
  name: String;
  @Prop()
  birthday: Date;
  @Prop()
  pictureProfile: String;
  @Prop()
  bannerProfile: String;
  @Prop()
  biography: String;
  @Prop()
  numberOfPoStS: Number;
  @Prop()
  numberOfFollowerS: Number;
  @Prop()
  numberOfFollowed: Number;
  @Prop({ unique: true })
  email: String;
  @Prop()
  password: String;
  @Prop()
  raza: String;
  @Prop()
  sexo: String;
  @Prop()
  phoneNumber: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
