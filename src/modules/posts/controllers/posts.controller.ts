import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Auth } from "src/modules/auth/decorator/auth.decorator";
import { Post as PostSchema } from "../schemas/post.schema";
import { PostsService } from "../services/posts.service";
import { User } from "../../users/schemas/user.schema";
import { FileInterceptor } from "@nestjs/platform-express";
import { ValidateImage } from "../../../utils/validateImage";
import { PostDto } from "../dtos/post.dtos";

interface PostResponse {
  message: string;
  data?: PostSchema;
  status: number;
}
@Controller("posts")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async allPost(): Promise<PostSchema[]> {
    return await this.postService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("img", {
      fileFilter: ValidateImage
    })
  )
  async createPost(
    @Body() postData: PostDto,
    @Auth() { id }: User,
    @UploadedFile() file: Express.Multer.File
  ): Promise<PostResponse> {
    await this.postService.create(file, postData.description, id);
    return { message: "Post created", status: 201 };
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async deletePost(@Param("id") id: string): Promise<{ message: string }> {
    await this.postService.delete(id);
    return { message: "Post deleted" };
  }
}
