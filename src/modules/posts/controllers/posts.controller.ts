import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Auth } from "src/modules/auth/decorator/auth.decorator";
import { Post as PostSchema } from "../schemas/post.schema";
import { PostsService } from "../services/posts.service";
import { User } from '../../users/schemas/user.schema';

interface IResponseJson<T> {
  data: T;
  message?: string;
}

@Controller("posts")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async allPost(): Promise<IResponseJson<PostSchema[]>> {
    const posts = await this.postService.findAll();
    return {
      data: posts,
      message: "All post"
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard("jwt"))
  async createPost(
    @Body() post: PostSchema,
    @Auth() { id }: User
  ): Promise<IResponseJson<PostSchema>> {
    const newPost = await this.postService.create(post, id);
    return {
      data: newPost,
      message: "Post created"
    };
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async deletePost(
    @Param("id") id: string
  ): Promise<Omit<IResponseJson<PostSchema>, "data">> {
    await this.postService.delete(id);
    return { message: "Post deleted" };
  }
}
