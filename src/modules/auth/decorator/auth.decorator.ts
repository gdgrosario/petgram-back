import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException
} from "@nestjs/common";
import { IPayloadToken } from "../models/token.model";

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Partial<IPayloadToken> => {
    try {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
);
