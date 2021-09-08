import { Module } from "@nestjs/common";
import { HistoriesController } from "./controllers/histories.controller";
import { HistoriesService } from "./services/histories.service";

@Module({
  controllers: [HistoriesController],
  providers: [HistoriesService]
})
export class HistoriesModule {}
