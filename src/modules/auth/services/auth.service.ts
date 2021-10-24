import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { UsersService } from "../../users/services/users.service";
import { User } from "../../users/entities/user.entity";
import { IPayloadToken } from "../models/token.model";

@Injectable()
export class AuthService {}
