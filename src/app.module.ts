import { Module } from "@nestjs/common";
//import { ConfigModule } from "@nestjs/config";

import { AppController } from "./controllers";

//import { DatabaseModule } from "../../database/database.module";
//import { CommentsModule } from "../comments/comments.module";
//import { UsersModule } from "../users/users.module";
//import { AuthModule } from "../auth/auth.module";
import { AuthUseCasesModule } from "./use-cases/auth/auth-use-cases.module";
import { AuthAdapterModule } from "./adapter/crm-services/auth/auth-adapter.module";

//import config from "../../config/config";

@Module({
  imports: [
    // ConfigModule.forRoot({
    //  envFilePath: ".env",
    // isGlobal: true,
    //load: [config]
    //}),
    //DatabaseModule,
    //UsersModule,
    //CommentsModule,
    //PostsModule,
    //AuthModule
    AuthUseCasesModule,
    AuthAdapterModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
