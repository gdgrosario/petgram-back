import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PostsController } from "./controllers/posts/posts.controller";
import { PostsService } from "./services/posts/posts.service";
import { CommentsController } from "./controllers/comments/comments.controller";
import { CommentsService } from "./services/comments/comments.service";
import { HistoriesController } from "./controllers/histories/histories.controller";
import { HistoriesService } from "./services/histories/histories.service";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || "mongodb://localhost/petgram"),
    UsersModule
  ],
  controllers: [AppController, PostsController, CommentsController, HistoriesController],
  providers: [AppService, PostsService, CommentsService, HistoriesService]
})
export class AppModule {}
