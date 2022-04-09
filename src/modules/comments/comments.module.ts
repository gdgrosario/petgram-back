import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../users/schemas/user.schema";
import { CommentsController } from "./controllers/comments.controller";
import { CommentSchema } from "./entities/comment.entity";
import { CommentsService } from "./services/comments.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Comments", schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: "Users", schema: UserSchema }])
  ],
  controllers: [CommentsController],
  exports: [CommentsService],
  providers: [CommentsService]
})
export class CommentsModule {}
