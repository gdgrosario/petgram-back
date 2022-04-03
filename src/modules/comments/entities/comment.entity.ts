import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

@Schema()
export class Comment extends Document {
	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	comment: string;

	@Prop({type: MongooseSchema.Types.ObjectId, ref: User.name, unique: false})
	user: MongooseSchema.Types.ObjectId;
}  

export const CommentSchema = SchemaFactory.createForClass(Comment);
