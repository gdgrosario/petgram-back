import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostSchema } from "../posts/schemas/post.schema";
import { UserSchema } from "../users/schemas/user.schema";
import { CommentsController } from "./controllers/comments.controller";
import { CommentSchema } from "./entities/comment.entity";
import { CommentsService } from "./services/comments.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Comments", schema: CommentSchema },
      { name: "Users", schema: UserSchema },
      { name: "Posts", schema: PostSchema }
    ]),
  ],
  controllers: [CommentsController],
  exports: [CommentsService],
  providers: [CommentsService]
})
export class CommentsModule {}
