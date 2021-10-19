import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { hash, genSalt } from "bcrypt";

import { CreateUserDto } from "../dtos/user.dtos";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectModel("Users") private readonly userModel: Model<User>) {}

  //TODO: ponerlo en el package utils
  private hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

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

  async create(payload: CreateUserDto): Promise<User> {
    const { email, nickname, password } = payload;
    const salt = await genSalt();

    const userFindWithEmail = await this.userModel.findOne({ email });
    const userFindWithNickname = await this.userModel.findOne({ nickname });

    if (userFindWithEmail) {
      throw new BadRequestException(
        `The user with the email: '${email}' already exists.`
      );
    }

    if (userFindWithNickname) {
      throw new BadRequestException(
        `The user with the nickname: '${nickname}' already exists.`
      );
    }

    const user = new this.userModel(payload);
    user.password = await this.hashPassword(password, salt);
    return await user.save();
  }

  /*update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex(element => element.id === id);
      this.users[index] = {
        ...user,
        ...payload
      };
      return this.users;
    }
    return null;
  }

  delete(id: number) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex(element => element.id === id);
      this.users.splice(index);
      return this.users;
    }
    return null;
  }*/
}
