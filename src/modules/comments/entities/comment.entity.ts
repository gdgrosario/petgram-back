import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Users", unique: false })
  user: MongooseSchema.Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Posts", unique: false })
  post: MongooseSchema.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.set("toJSON", {
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret.__v;
    delete ret._id;
    delete ret.post;
  }
});
