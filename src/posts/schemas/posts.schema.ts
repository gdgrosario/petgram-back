
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PostShemaDocument = PostS & Document;

@Schema()
export class PostS {
  @Prop({ required: true })
  pathPhoto: string;
  @Prop({ required: true })
  author: string;
  @Prop({ required: false })
  description: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  numberOfLikes: number;
  @Prop({ required: false })
  coments: [];
  
}

export const PostShema = SchemaFactory.createForClass(PostS);

PostShema.set('toJSON', {
  transform: (document, returnedObjet) => {
      returnedObjet.id = returnedObjet._id,
      delete returnedObjet._id
      delete returnedObjet.__v
  }
})