import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { DatabaseModule } from "../../database/database.module";
import { CommentsModule } from "../comments/comments.module";
import { UsersModule } from "../users/users.module";
import { HistoriesModule } from "../histories/histories.module";
import { PostsModule } from "../posts/posts.module";
import { AuthModule } from "../auth/auth.module";

import config from "../../config/config";
import { validateRequiredData } from "../../middlewares/validateRequiredData";

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
    HistoriesModule,
    PostsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(validateRequiredData)
      .forRoutes({ path: "/auth/register", method: RequestMethod.POST });
  }
}
