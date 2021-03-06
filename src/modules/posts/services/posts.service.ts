import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/modules/users/schemas/user.schema";
import { Comment } from "../../comments/entities/comment.entity";
import { Post } from "../schemas/post.schema";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel("Posts") private readonly postModel: Model<Post>,
    @InjectModel("Users") private readonly userModel: Model<User>,
    @InjectModel("Comments") private readonly commentModel: Model<Comment>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel
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
        options: {
          limit: 2
        }
      });
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
