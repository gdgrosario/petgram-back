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
  UseGuards
} from "@nestjs/common";
import { Comment } from "../entities/comment.entity";
import { CommentsService } from "../services/comments.service";
import { AuthGuard } from '@nestjs/passport';

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
  async getAll(): Promise<IResponseJson<Comment[]>> {
    const comments = await this.commentService.findAll();
    return { data: comments, message: "OK" };
  }

  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async getById(@Param("id") id: string): Promise<IResponseJson<Comment>> {
    const comment = await this.commentService.findById(id);
    return { data: comment };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard("jwt"))
  async createComment(@Body() comment: Comment): Promise<IResponseJson<Comment>> {
    const commentNew = await this.commentService.create(comment);
    return {
      data: commentNew,
      message: "Comment created"
    };
  }

  @Put("/:id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard("jwt"))
  async updateComment(
    @Body() comment: Comment,
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
