import { Module } from "@nestjs/common";
import { AuthFactoryService } from "./auth-factory.service";

@Module({
  providers: [AuthFactoryService]
})
export class AuthUseCasesModule {}
