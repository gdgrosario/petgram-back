import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/modules/users/schemas/user.schema";
import { Comment } from "../../comments/entities/comment.entity";
import { Post } from "../schemas/post.schema";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";
import { PaginationParamsDto } from "../../../dtos/paginationParams.dtos";
import { PaginationModel } from "../../../utils/pagination";
import { ReponsePagination } from "src/interfaces/responses";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel("Posts") private readonly postModel: Model<Post>,
    @InjectModel("Users") private readonly userModel: Model<User>,
    @InjectModel("Comments") private readonly commentModel: Model<Comment>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async findAll({
    skip,
    limit
  }: PaginationParamsDto): Promise<ReponsePagination<Post[]>> {
    const queryPost = this.postModel
      .find()
      .populate({
        path: "user",
        model: this.userModel,
        select: ["nickname", "name", "id", "avatar"]
      })
      .populate({
        path: "comments",
        model: this.commentModel,
        populate: {
          path: "user",
          model: this.userModel,
          select: ["nickname", "name", "id", "avatar"]
        },
        perDocumentLimit: 2
      });

    const count = await this.postModel.find().countDocuments();

    const response = await PaginationModel<Post>({
      paramsPagination: { skip, limit },
      model: queryPost
    });

    if (response)
      return {
        data: response,
        count
      };

    throw new NotFoundException("Post in comment not found");
  }

  async create(imageFile: Express.Multer.File, description: string, idUser: string) {
    const findUser = await this.userModel.findById(idUser);
    if (!findUser) throw new BadRequestException("User not found");
    if (!imageFile) throw new BadRequestException("Image for post is required");
    try {
      const { public_id, url } = await this.cloudinaryService.uploadPost(
        imageFile,
        findUser.nickname
      );
      const post = await new this.postModel({
        description,
        image: {
          url,
          public_id
        },
        user: idUser
      }).save();

      await this.userModel.findByIdAndUpdate(
        idUser,
        {
          $push: { posts: post }
        },
        { new: true }
      );
    } catch (error) {
      throw new BadRequestException("Error publishing post");
    }
  }

  async delete(id: string): Promise<void> {
    await this.postModel.findByIdAndRemove(id);
  }
}
