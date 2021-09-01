import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { User } from "../../entities/user.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../../schemas/users/user.schema";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot("mongodb://localhost/testpetgram"),
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }])
      ],
      providers: [UsersService]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return array users", async () => {
    const users = await service.findAll();
    console.log(users);
    expect(Array.isArray(users)).toBeTruthy();
  });

  it("should return a single users", async () => {
    const user: User = {
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
    };
    const users = await service.findOne(user.id);
    expect(users.id).toBe(user.id);
  });
});
