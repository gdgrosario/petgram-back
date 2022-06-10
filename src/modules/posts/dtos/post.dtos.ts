import { IsNotEmpty, IsString } from "class-validator";

export class PostDto {
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly image: string;
}
