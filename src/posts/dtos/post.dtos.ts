import { IsString, IsNotEmpty, IsInt, IsEmail, IsArray } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
export class PostDto {
    @IsString()
    @IsNotEmpty()
    readonly pathPhoto: string;

    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsInt()
    readonly numberOfLikes: number;
    
    @IsArray()
    readonly coments: [];
}

export class CreatePostDto extends PartialType(PostDto) {}