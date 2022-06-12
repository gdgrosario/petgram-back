import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentSchema } from "../comments/entities/comment.entity";
import { UserSchema } from "../users/schemas/user.schema";
import { PostsController } from "./controllers/posts.controller";
import { PostSchema } from "./schemas/post.schema";
import { PostsService } from "./services/posts.service";


@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: "Posts", schema: PostSchema },
			{ name: "Users", schema: UserSchema },
			{ name: "Comments", schema: CommentSchema }
		])
	],
	controllers: [PostsController],
	providers: [PostsService],
	exports: [PostsService]
})
export class PostsModule { }
