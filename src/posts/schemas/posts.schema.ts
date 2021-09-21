
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PostShemaDocument = PostS & Document;

@Schema()
export class PostS {
  @Prop({ required: true })
  pathPhoto: String;
  @Prop({ required: true })
  author: String;
  @Prop({ required: false })
  description: String;
  @Prop({ required: true })
  title: String;
  @Prop({ required: true })
  numberOfLikes: Number;
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