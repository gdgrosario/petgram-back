import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/modules/users/schemas/user.schema";
import { Comment } from "../../comments/entities/comment.entity";
import { PostDto } from "../dtos/post.dtos";
import { Post } from "../schemas/post.schema";

@Injectable()
export class PostsService {
	constructor(
		@InjectModel("Posts") private readonly postModel: Model<Post>,
		@InjectModel("Users") private readonly userModel: Model<User>,
		@InjectModel("Comments") private readonly commentModel: Model<Comment>
	) { }

	async findAll(): Promise<Post[]> {
		return this.postModel.find().populate("comments", "", this.commentModel);
	}

	async create(data: PostDto, idUser: string): Promise<Post> {
		const post = new this.postModel(data);
		const postSave = await post.save();
		await this.userModel.findByIdAndUpdate(idUser, {
			$push: { posts: postSave }
		});
		return postSave;
	}

  async delete(id:string): Promise<void> {
    await this.postModel.findByIdAndRemove(id);
  }
}
