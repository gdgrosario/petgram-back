import { Prop, Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Comment extends Document {
	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	comment: string;

	//TODO: relation user model
	@Prop({ required: true })
	@IsString()
	@IsNotEmpty()
	user: string;
}  
