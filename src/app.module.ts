import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { CommentsModule } from "./modules/comments/comments.module";
import { UsersModule } from "./modules/users/users.module";
import { HistoriesModule } from "./modules/histories/histories.module";
import { PostsModule } from "./modules/posts/posts.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || "mongodb://localhost/petgram", {
      useCreateIndex: true
    }),
    UsersModule,
    CommentsModule,
    HistoriesModule,
    PostsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
