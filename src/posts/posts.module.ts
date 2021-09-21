import { Module } from "@nestjs/common";
import { PostsController } from "./controllers/posts.controller";
import { PostsService } from "./services/posts.service";
import { MongooseModule } from '@nestjs/mongoose';
import { PostShema } from './schemas/posts.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Posts", schema: PostShema}])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
