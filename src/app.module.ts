import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { CommentsModule } from "./comments/comments.module";
import { UsersModule } from "./users/users.module";
import { HistoriesModule } from "./histories/histories.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";

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
