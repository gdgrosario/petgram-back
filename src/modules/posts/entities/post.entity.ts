import { Prop, Schema } from "@nestjs/mongoose";
import { IsNumber, IsString } from "class-validator";
import { Document } from "mongoose";

@Schema()
export class Posts extends Document {
  @Prop({ required: true })
  @IsString()
  descripcion: string;

  @IsString()
  location: string;

  @IsNumber()
  likes: number;
}
