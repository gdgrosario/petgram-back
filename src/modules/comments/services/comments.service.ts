import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { CommentDto, EditCommentDto } from "../dtos/comment.dtos";
import { Comment } from "../entities/comment.entity";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel("Comments") private readonly commentModel: Model<Comment>,
    @InjectModel("Users") private readonly userModel: Model<User>
  ) {}

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModel.find().populate("user", "", this.userModel);
    return comments;
  }

  async findById(id: string): Promise<Comment> {
    const comment = await this.commentModel
      .findById(id)
      .populate("user", "", this.userModel);
    if (!comment) {
      throw new NotFoundException(`The comment with the ID: '${id}' was not found.`);
    }
    return comment;
  }

  async create(data: CommentDto): Promise<Comment> {
    const comment = new this.commentModel(data);
    return await comment.save();
  }

  async update(id: string, comment: EditCommentDto): Promise<Comment> {
    const commentUpdate = await this.commentModel.findByIdAndUpdate(id, comment, {
      new: true
    });
    return commentUpdate;
  }

  async delete(id: string): Promise<void> {
    await this.commentModel.findByIdAndRemove(id);
  }
}
