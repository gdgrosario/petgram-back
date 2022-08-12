import { Module } from "@nestjs/common";
import { AuthAdapterService } from "./auth-adapter.service";

@Module({
  providers: [AuthAdapterService]
})
export class AuthAdapterModule {}
