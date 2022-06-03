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

	async follow(id: string, idFollow: string): Promise<{ message: string }> {
		const userFollower = await this.userModel.find({ followers: { "$all": [idFollow] }, _id: id });
		if (userFollower.length > 0) {
			throw new BadRequestException("you already follow this user");
		} else {
			const user = await this.userModel.findById(id);
			const follower = await this.userModel.findById(idFollow);

			await this.userModel.findByIdAndUpdate(user, {
				$push: { followers: follower }
			});
		}

		return { message: "Followed successfully " };
	}

	async findUsersByNickname(nickname: string): Promise<User[]> {
		const users = await this.userModel.find({ nickname: { $regex: `^${nickname}`, $options: "i" } });
		return users;
	}
}
