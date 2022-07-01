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
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
