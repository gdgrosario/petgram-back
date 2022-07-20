import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Comment } from "../entities/comment.entity";
import { CommentsService } from "../services/comments.service";
import { CommentDto, EditCommentDto } from "../dtos/comment.dtos";
import { Auth } from "src/modules/auth/decorator/auth.decorator";
import { User } from "../../users/schemas/user.schema";
import { PaginationParamsDto } from "../dtos/paginationParams.dtos";

interface IResponseJson<T> {
  data: T;
  message?: string;
}

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async getAll(
    @Query() { skip, limit }: PaginationParamsDto
  ): Promise<IResponseJson<Comment[]>> {
    const comments = await this.commentService.findAll({ skip, limit });
    return { data: comments, message: "OK" };
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async getById(@Param("id") id: string): Promise<IResponseJson<Comment>> {
    const comment = await this.commentService.findById(id);
    return { data: comment };
  }
  @Get("/get-comments-in-post/:postId")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async getCommentsInPost(
    @Param("postId") postId: string,
    @Query() { skip, limit }: PaginationParamsDto
  ): Promise<Comment[]> {
    const comment = await this.commentService.getAllComentsInPost(postId, {
      skip,
      limit
    });
    return comment;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard("jwt"))
  async createComment(
    @Body() comment: CommentDto,
    @Auth() { id }: User
  ): Promise<IResponseJson<Comment>> {
    const commentNew = await this.commentService.create(comment, id);
    return {
      data: commentNew,
      message: "Comment created"
    };
  }

  @Put("/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async updateComment(
    @Body() comment: EditCommentDto,
    @Param("id") id: string
  ): Promise<IResponseJson<Comment>> {
    const commentUpdate = await this.commentService.update(id, comment);
    return {
      data: commentUpdate,
      message: "Comment updated"
    };
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async deleteComment(
    @Param("id") id: string
  ): Promise<Omit<IResponseJson<Comment>, "data">> {
    await this.commentService.delete(id);
    return { message: "Comment deleted" };
  }
}
