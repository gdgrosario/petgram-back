import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Comment } from "../entities/comment.entity";
import { CommentsService } from "../services/comments.service";

@Controller("comments")
export class CommentsController {
	constructor(private readonly commentService: CommentsService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAll(): Promise<{ data: Comment[] }> {
		const comments = await this.commentService.findAll();
		return { data: comments };
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	createComment(@Body() comment: Comment): Promise<Comment> {
		return this.commentService.create(comment);
	}
}
