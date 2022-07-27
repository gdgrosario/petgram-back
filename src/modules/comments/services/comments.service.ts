import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, isValidObjectId, ObjectId } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { CommentDto, EditCommentDto } from "../dtos/comment.dtos";
import { Comment } from "../entities/comment.entity";
import { Post } from "../../posts/schemas/post.schema";
import { PaginationParamsDto } from "../dtos/paginationParams.dtos";
import { PaginationModel } from "../../../utils/pagination";
import { ResponseComment } from "../interface/response";

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel("Comments") private readonly commentModel: Model<Comment>,
    @InjectModel("Users") private readonly userModel: Model<User>,
    @InjectModel("Posts") private readonly postModel: Model<Post>
  ) {}

  async findAll({ skip, limit }: PaginationParamsDto): Promise<Comment[]> {
    const queryComment = this.commentModel.find().populate("user", "", this.userModel);

    return await PaginationModel<Comment>({
      paramsPagination: { skip, limit },
      model: queryComment
    });
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

  async getAllComentsInPost(
    postId: string,
    { skip, limit }: PaginationParamsDto
  ): Promise<ResponseComment<Comment[]>> {
    if (!isValidObjectId(postId)) throw new BadRequestException("Id not valid");

    const queryCommentInPost = this.commentModel
      .find({
        post: postId as unknown as ObjectId
      })
      .populate({
        path: "user",
        select: ["name", "nickname", "avatar"]
      });

    const count = await this.commentModel
      .find({ post: postId as unknown as ObjectId })
      .countDocuments();

    const response = await PaginationModel<Comment>({
      paramsPagination: { skip, limit },
      model: queryCommentInPost
    });
    if (response)
      return {
        data: response,
        count
      };

    throw new NotFoundException("Post in comment not found");
  }

  async create(data: CommentDto, ownerUserId: string): Promise<Comment> {
    if (!isValidObjectId(ownerUserId) || !isValidObjectId(data.postId))
      throw new NotFoundException(`Ids not valid`);

    const findUser = await this.userModel.findById(ownerUserId);
    const findPost = await this.postModel.findById(data.postId);

    if (!findUser)
      throw new NotFoundException(
        `The user with the ID: '${ownerUserId}' was not found.`
      );
    if (!findPost)
      throw new NotFoundException(
        `The post with the ID: '${data.postId}' was not found.`
      );

    const comment = await new this.commentModel({
      comment: data.comment,
      user: ownerUserId,
      post: data.postId
    }).save();

    const populateUser = await this.commentModel.findById(comment.id).populate({
      path: "user",
      select: ["name", "nickname", "avatar"]
    });

    await findPost.updateOne({
      $push: {
        comments: comment.id
      }
    });

    return populateUser;
  }

  async update(id: string, data: EditCommentDto): Promise<Comment> {
    if (!isValidObjectId(id)) throw new NotFoundException(`Id not valid`);

    const findComment = await this.commentModel.findById(id);
    if (!findComment)
      throw new NotFoundException(`The comment with the ID: '${id}' was not found.`);

    const commentUpdate = await this.commentModel.findByIdAndUpdate(
      id,
      {
        comment: data.comment
      },
      { new: true }
    );
    return commentUpdate;
  }

  async delete(id: string): Promise<void> {
    if (!isValidObjectId(id)) throw new NotFoundException(`Id not valid`);

    const findComment = await this.commentModel.findById(id);
    if (!findComment)
      throw new NotFoundException(`The comment with the ID: '${id}' was not found.`);

    await this.commentModel.findByIdAndRemove(id);
  }
}
