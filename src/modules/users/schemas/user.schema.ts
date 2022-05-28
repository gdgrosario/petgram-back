import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ unique: true })
  nickname: string;
  @Prop()
  name: string;
  @Prop()
  birthday: string;
  @Prop()
  pictureProfile: string;
  @Prop()
  bannerProfile: string;
  @Prop()
  biography: string;
  @Prop()
  numberOfPoStS: number;
  @Prop()
  numberOfFollowerS: number;
  @Prop()
  numberOfFollowed: number;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  raza: string;
  @Prop()
  sexo: string;
  @Prop()
  phoneNumber: string;
  @Prop({ default: "USER" })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
    delete ret.password;
  }
});
