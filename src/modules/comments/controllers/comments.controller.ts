import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { CommentsService } from "../services/comments.service";

@Controller("comments")
export class CommentsController {
	constructor(private readonly commentService: CommentsService) {}

  //getAll(@Query("limit") limit = 100, @Query("offset") offset = 0) {
    //return this.usersService.findAll();
 

	@Get()
	@HttpCode(HttpStatus.OK)
	getAll(@Query("limit") limit = 100, @Query("offset") offset = 0) {
		return this.commentService.findAll();
	}
}
