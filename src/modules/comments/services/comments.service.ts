import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CommentDto } from "../dtos/comment.dtos";
import { Comment } from "../entities/comment.entity";

@Injectable()
export class CommentsService {
	constructor(@InjectModel("Comment") private readonly commentModel: Model<Comment>) {}

	async findAll(): Promise<Comment[]> {
		const comments = await this.commentModel.find();
		return comments;
	}


  async create(data: CommentDto): Promise<Comment> {
    const comment = new this.commentModel(data);
    return await comment.save();
  }

}
