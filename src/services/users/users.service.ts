import { UpdateUserDto } from "./../../dtos/user.dtos";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/user.dtos";
import { User } from "src/entities/user.entity";

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: Array<User> = [
    {
      id: 1,
      nickname: "garfield_007",
      name: "Garfield",
      birthday: "2020-08-25",
      pictureProfile: "",
      bannerProfile: "",
      biography: "",
      numberOfPosts: 0,
      numberOfFollowers: 0,
      numberOfFollowed: 0,
      email: "garfield007@gdgrosario.com",
      password: "Abcd1234",
      raza: "Dalmata",
      sexo: "Masculino",
      phoneNumber: "+5493413944318"
    }
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(element => element.id === id);
    if (!user) {
      throw new NotFoundException(`The user with the ID: '${id}' was not found.`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
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
  }
}
