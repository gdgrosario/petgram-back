import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { CommentDto } from "../dtos/comment.dtos";
import { Comment } from "../entities/comment.entity";

@Injectable()
export class CommentsService {
	constructor(
		@InjectModel("Comments") private readonly commentModel: Model<Comment>,
		@InjectModel("Users") private readonly userModel: Model<User>,
	) {}

	async findAll(): Promise<Comment[]> {
		const comments = await this.commentModel.find().populate("user", "", this.userModel);
		return comments;
	}


  async create(data: CommentDto): Promise<Comment> {
    const comment = new this.commentModel(data);
    return await comment.save();
  }

}
