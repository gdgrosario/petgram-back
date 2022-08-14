import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
import { ValidateImage } from "../../../utils/image";
import { PostDto } from "../dtos/post.dtos";
import { PaginationParamsDto } from "../../../dtos/paginationParams.dtos";
import { ReponsePagination } from "src/interfaces/responses";
import { UserBasic } from "../interface/responses";
import { storage } from "../../../utils/image";
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
  async allPost(
    @Query() { skip, limit }: PaginationParamsDto
  ): Promise<ReponsePagination<PostSchema[]>> {
    return this.postService.findAll({ skip, limit });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(
    FileInterceptor("img", {
      fileFilter: ValidateImage,
      storage
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

  @Patch("/like/:postId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async createLikeInPost(
    @Auth() { id }: User,
    @Param("postId") postId: string
  ): Promise<{ message: string }> {
    return this.postService.createLike(id, postId);
  }

  @Patch("/remove-like/:postId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async removeLike(
    @Auth() { id }: User,
    @Param("postId") postId: string
  ): Promise<{ message: string }> {
    return this.postService.removeLike(id, postId);
  }

  @Get("/user-in-likes-post/:postId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async getUserInLikes(@Param("postId") postId: string): Promise<UserBasic[]> {
    return this.postService.getAllLikesInPost(postId);
  }
}
