import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, ObjectId } from "mongoose";
import { Hash } from "../../utils/Hash";
import { CreateUserDto, UpdateUserDto } from "./dtos/user.dtos";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { User } from "./schemas/user.schema";
import { Post } from "../posts/schemas/post.schema";
import { Comment } from "../comments/entities/comment.entity";
import { removeFile } from "../../utils/image";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("Users") private readonly userModel: Model<User>,
    @InjectModel("Posts") private readonly postModel: Model<Post>,
    @InjectModel("Comments") private readonly commentModel: Model<Comment>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User | undefined> {
    if (isValidObjectId(id)) {
      const user = await this.userModel
        .findById(id)
        .populate("followeds", ["nickname", "name", "id", "avatar"], this.userModel)
        .populate("followers", ["nickname", "name", "id", "avatar"], this.userModel)
        .populate("posts", "", this.postModel);
      if (!user) {
        throw new NotFoundException(`The user with the ID: '${id}' was not found.`);
      }
      return user;
    }
    throw new BadRequestException("id is invalid");
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .populate("followeds", ["nickname", "name", "id", "avatar"], this.userModel)
      .populate("followers", ["nickname", "name", "id", "avatar"], this.userModel);
  }

  async create(data: CreateUserDto): Promise<User> {
    const { email, nickname, password } = data;

    const userFindWithEmailAndNickname = await this.userModel
      .findOne({
        $or: [{ email }, { nickname }]
      })
      .populate("followeds", ["nickname", "name", "id", "avatar"], this.userModel)
      .populate("followers", ["nickname", "name", "id", "avatar"], this.userModel);

    if (userFindWithEmailAndNickname) {
      throw new BadRequestException("The email or nickname already exists.");
    }

    const user = new this.userModel(data);
    user.password = Hash.make(password);
    return await user.save();
  }

  async updateProfile(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, data, { new: true });

    return user;
  }

  async findOneByUserName(userName: string): Promise<User> {
    const user = await this.userModel
      .findOne({ nickname: userName })
      .select([
        "nickname",
        "name",
        "id",
        "avatar",
        "numberOfFollowers",
        "numberOfFollowed",
        "posts",
        "followeds",
        "followers"
      ])
      .populate("followeds", ["nickname", "name", "id", "avatar"], this.userModel)
      .populate("followers", ["nickname", "name", "id", "avatar"], this.userModel)
      .populate({
        path: "posts",
        model: this.postModel,
        populate: [
          {
            path: "comments",
            model: this.commentModel,
            populate: {
              path: "user",
              model: this.userModel,
              select: ["nickname", "name", "id", "avatar"]
            }
          },
          {
            path: "userLikes",
            model: this.userModel,
            select: ["nickname", "name", "id", "avatar"]
          }
        ]
      });

    return user;
  }

  async recoverPassword(id: string, password: string): Promise<{ message: string }> {
    const user = await this.userModel.findById(id);
    user.password = Hash.make(password);
    await user.save();
    return { message: "Updated successfully" };
  }

  async findUsersByNickname(nickname: string): Promise<User[]> {
    const users = await this.userModel.find(
      {
        nickname: { $regex: `^${nickname}`, $options: "i" }
      },
      { nickname: 1, name: 1, avatar: 1 }
    );
    return users;
  }

  async follow(id: ObjectId, idFollow: ObjectId): Promise<{ message: string }> {
    const user = await this.userModel.findById(id);
    const futureFollower = await this.userModel.findById(idFollow);
    const FollowInUser = await this.userModel.find({
      _id: id,
      followeds: idFollow
    });

    if (!futureFollower || !user) throw new BadRequestException("User not found");
    if (id === idFollow) throw new BadRequestException("You can't follow yourself");
    if (FollowInUser.length > 0) {
      throw new BadRequestException("you already follow this user");
    } else {
      await this.userModel.findByIdAndUpdate(user, {
        $inc: { numberOfFollowed: 1 },
        $push: { followeds: futureFollower.id }
      });

      await this.userModel.findByIdAndUpdate(futureFollower, {
        $push: { followers: user.id },
        $inc: { numberOfFollowers: 1 }
      });
      return { message: "Followed successfully " };
    }
  }

  async unFollow(id: string, idFollow: ObjectId): Promise<{ message: string }> {
    const user = await this.userModel.findById(id);
    const followed = await this.userModel.findById(idFollow);

    const FollowInUser = await this.userModel.find({
      _id: id,
      followeds: idFollow
    });

    if (!followed || !user) throw new BadRequestException("User not found");
    if (user.numberOfFollowed > 0 && FollowInUser) {
      await this.userModel.findByIdAndUpdate(user, {
        $inc: { numberOfFollowed: -1 },
        $pull: { followeds: followed.id }
      });

      await this.userModel.findByIdAndUpdate(followed, {
        $pull: { followers: user.id },
        $inc: { numberOfFollowers: -1 }
      });

      return { message: "Unfollowed successfully " };
    } else throw new BadRequestException("You don't unfollow this user");
  }

  async handleAvatar(
    id: string,
    file: Express.Multer.File
  ): Promise<{ message: string; url: string }> {
    let response: { public_id: string; url: string } = {
      public_id: "",
      url: ""
    };

    const findUser = await this.userModel.findById(id);
    if (!findUser) throw new BadRequestException("User not found");

    try {
      if (findUser.avatar && findUser.avatar.public_id) {
        const { public_id, secure_url } = await this.cloudinaryService.updateAvatar(
          findUser.avatar.public_id,
          file,
          findUser.nickname
        );

        response = {
          public_id,
          url: secure_url
        };
      } else {
        const { public_id, secure_url } = await this.cloudinaryService.uploadAvatar(
          file,
          findUser.nickname
        );

        response = {
          public_id,
          url: secure_url
        };
      }
      await this.userModel.findByIdAndUpdate(
        findUser.id,
        {
          avatar: {
            public_id: response.public_id,
            url: response.url
          }
        },
        { new: true }
      );

      removeFile(file.path);

      return {
        message: "ok",
        url: response.url
      };
    } catch (error) {
      throw new BadRequestException("Error uploading avatar");
    }
  }

  async removeAvatar(id: string): Promise<{ message: string }> {
    const findUser = await this.userModel.findById(id);
    if (!findUser) throw new BadRequestException("User not found");

    await this.cloudinaryService.removeMedia(findUser.avatar.public_id);
    await this.userModel.findByIdAndUpdate(
      id,
      { avatar: { public_id: "", url: "" } },
      { new: true }
    );

    return { message: "Avatar removed successfully" };
  }
}
