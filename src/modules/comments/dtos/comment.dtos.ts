import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNotEmpty } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  readonly comment: string;

  @IsNotEmpty()
  readonly user: MongooseSchema.Types.ObjectId;
}

export class EditCommentDto extends PartialType(CommentDto) {}
