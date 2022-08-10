import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Document } from "mongoose";
import { MediaType } from "../../cloudinary/cloudinary.schema";

@Schema()
export class Post {
  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  numberOflikes: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users", unique: true })
  userLikes: MongooseSchema.Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Comments" })
  comments: MongooseSchema.Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users" })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  image: MediaType;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.id = ret._id;
    ret.image = ret.image.url;
    delete ret.__v;
    delete ret._id;
  }
});
