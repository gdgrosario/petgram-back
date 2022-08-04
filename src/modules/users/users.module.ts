import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";

import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { PostSchema } from "../posts/schemas/post.schema";
import { CommentSchema } from "../comments/entities/comment.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Users", schema: UserSchema },
      { name: "Posts", schema: PostSchema },
      { name: "Comments", schema: CommentSchema }
    ]),
    CloudinaryModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
