import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { Post } from "src/modules/posts/schemas/post.schema";

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
  numberOfFollowers: number;
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
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, unique: true })
  followers: MongooseSchema.Types.ObjectId[];
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, unique: true })
  followeds: MongooseSchema.Types.ObjectId[];
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Post.name })
  posts: MongooseSchema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
    delete ret.password;
  }
});
