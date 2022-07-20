import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class PaginationParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  readonly limit: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  readonly skip: number;
}
