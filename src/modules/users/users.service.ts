import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model } from "mongoose";
import { Hash } from "../../utils/Hash";
import { CreateUserDto, UpdateUserDto } from "./dtos/user.dtos";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
	constructor(@InjectModel("Users") private readonly userModel: Model<User>) { }

	async findAll(): Promise<User[]> {
		const users = await this.userModel.find();
		return users;
	}

	async findOne(id: string): Promise<User | undefined> {
		if (isValidObjectId(id)) {
			const user = await this.userModel.findById(id);
			if (!user) {
				throw new NotFoundException(`The user with the ID: '${id}' was not found.`);
			}
			return user;
		}
		throw new BadRequestException("id is invalid");
	}

	async findByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email });
	}

	async create(data: CreateUserDto): Promise<User> {
		const { email, nickname, password } = data;

		const userFindWithEmailAndNickname = await this.userModel.findOne({
			$or: [{ email }, { nickname }]
		});

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
		const user = await this.userModel.findOne({ nickname: userName });
		return user;
	}

	async recoverPassword(id: string, password: string): Promise<{ message: string }> {
		const user = await this.userModel.findById(id);
		user.password = Hash.make(password);
		await user.save();
		return { message: "Updated successfully" };
	}
	
	async findUsersByNickname(nickname: string): Promise<User[]> {
		const users = await this.userModel.find({ nickname: { $regex: `^${nickname}`, $options: "i" } });
		return users;
	}

	async follow(id: string, idFollow: string): Promise<{ message: string }> {
		const user = await this.userModel.findById(id);
		const futureFollower = await this.userModel.findById(idFollow)
		const FollowInUser = await this.userModel.find(
			{ _id: id, followeds: { $in: idFollow } }
		)

		if(!futureFollower || !user)
			throw new BadRequestException("User not found")
		if(id === idFollow)
			throw new BadRequestException("You can't follow yourself")
		if (FollowInUser.length > 0) {
			throw new BadRequestException("you already follow this user");
		} else {

			await this.userModel.findByIdAndUpdate(user, {
				$inc: { numberOfFollowed: 1 },
				$push: { followeds: futureFollower },
			})

			await this.userModel.findByIdAndUpdate(futureFollower, {
				$push: { followers: user },
				$inc: { numberOfFollowers: 1 },
			})
			return { message: "Followed successfully " };
		}

	}

	async unFollow(id: string, idFollow: string): Promise<{ message: string }> {
		const user = await this.userModel.findById(id)
		const followed = await this.userModel.findById(idFollow)
		const FollowInUser = await this.userModel.find(
			{ _id: id, followeds: { $in: idFollow } }
		)

		if(!followed || !user)
			throw new BadRequestException("User not found")
		if(user.numberOfFollowed > 0 && FollowInUser.length > 0) {
			await this.userModel.findByIdAndUpdate(user, {
				$inc: { numberOfFollowed: -1 },
				$pull: { followeds: followed.id },
			})

			await this.userModel.findByIdAndUpdate(followed, {
				$pull: { followers: user.id },
				$inc: { numberOfFollowers: -1 },
			})

			return { message: "Unfollowed successfully " }

		}else throw new BadRequestException("You don't unfollow this user")

	}

}
