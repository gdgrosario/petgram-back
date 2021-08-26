import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersController } from "./controllers/users/users.controller";
import { PostsController } from "./controllers/posts/posts.controller";
import { UsersService } from "./services/users/users.service";
import { PostsService } from "./services/posts/posts.service";
import { CommentsController } from "./controllers/comments/comments.controller";
import { CommentsService } from "./services/comments/comments.service";
import { HistoriesController } from "./controllers/histories/histories.controller";
import { HistoriesService } from "./services/histories/histories.service";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || "mongodb://localhost/petgram")
  ],
  controllers: [
    AppController,
    UsersController,
    PostsController,
    CommentsController,
    HistoriesController
  ],
  providers: [AppService, UsersService, PostsService, CommentsService, HistoriesService]
})
export class AppModule {}
