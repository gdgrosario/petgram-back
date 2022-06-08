import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostsController } from "./controllers/posts.controller";
import { PostSchema } from "./schemas/post.schema";
import { UserSchema } from "../users/schemas/user.schema";
import { PostsService } from "./services/posts.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Posts", schema: PostSchema },
      { name: "Users", schema: UserSchema }
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
