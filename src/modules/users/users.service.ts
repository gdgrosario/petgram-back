import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateUserDto } from "./dtos/user.dtos";
import { User } from "./entities/user.entity";
import { Hash } from "../../utils/Hash";

@Injectable()
export class UsersService {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`The user with the ID: '${id}' was not found.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }

  async create(data: CreateUserDto): Promise<User> {
    const { email, nickname, password } = data;

    const userFindWithEmailAndNickname = await this.userModel.findOne({
      $or: [{ email }, { nickname }]
    });

    if (userFindWithEmailAndNickname)
      throw new BadRequestException(
        "The user or nickname already exists."
      )
    
    const user = new this.userModel(data);
    user.password = Hash.make(password);
    return await user.save();
  }
}
