import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Auth } from "src/modules/auth/decorator/auth.decorator";
import { User } from "../../users/entities/user.entity";
import { Post as PostSchema } from "../schemas/post.schema";
import { PostsService } from "../services/posts.service";

interface IResponseJson<T> {
  data: T;
  message?: string;
}

@Controller("posts")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

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
}
