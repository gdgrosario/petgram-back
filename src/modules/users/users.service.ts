import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateUserDto } from './dtos/user.dtos';
import { User } from "./entities/user.entity";
import { Hash } from "../../utils/Hash";
import { validateRequiredData } from '../../helpers/validateRequiredData';

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

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }); 
  }

  async create(data: CreateUserDto) {
    const { email, nickname, password, sexo } = data;
     
    const userFindWithEmail = await this.userModel.findOne({ email });
    const userFindWithNickname = await this.userModel.findOne({ nickname }); 

    if (userFindWithEmail)
      return new BadRequestException(
        `The user with the email: '${email}' already exists.`
      ).getResponse();

    else if(!email) 
      return new BadRequestException(`The field 'email' is required.`).getResponse();
    
    if (userFindWithNickname) {
      return new BadRequestException(
        `The user with the nickname: '${nickname}' already exists.`
        ).getResponse();
      }
    else if(!nickname)
      return new BadRequestException(`The field 'nickname' is required.`).getResponse();
      
    if(!password)
      return new BadRequestException(`The field 'password' is required.`).getResponse();
    
    if(!sexo)
      return new BadRequestException(`The field 'sexo' is required.`).getResponse();

      
    const user = new this.userModel(data);
    user.password = Hash.make(password);
    return await user.save();
  }
}

