import { PartialType } from "@nestjs/mapped-types";
import { IsString, IsNotEmpty } from "class-validator";

export class CommentDto {
	@IsString()
	@IsNotEmpty()
	readonly comment:string;

	@IsString()
	@IsNotEmpty()
	readonly user:string;
}

export class EditCommentDto extends PartialType(CommentDto) {}
