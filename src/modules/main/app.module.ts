import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { DatabaseModule } from "../../database/database.module";
import { CommentsModule } from "../comments/comments.module";
import { UsersModule } from "../users/users.module";
import { PostsModule } from "../posts/posts.module";
import { AuthModule } from "../auth/auth.module";

import config from "../../config/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [config]
    }),
    DatabaseModule,
    UsersModule,
    CommentsModule,
    PostsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
