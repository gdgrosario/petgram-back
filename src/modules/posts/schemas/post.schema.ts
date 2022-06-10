import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { Comment } from "src/modules/comments/entities/comment.entity";
import { User } from "../../users/entities/user.entity";

@Schema()
export class Post {
  @Prop({ required: true })
  description: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  labels: MongooseSchema.Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Comment.name })
  comments: MongooseSchema.Types.ObjectId[];

  @Prop({ required: true })
  image: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
