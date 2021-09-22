import { Body, Controller, Get, HttpStatus, Post, HttpCode, Param, Delete, Put} from "@nestjs/common";
import { PostDto } from "../dtos/post.dtos";
import { Post as PostEntity } from "../entities/post.entity";
import { PostsService } from '../services/posts.service';


@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createPost(@Body() payload: PostDto):Promise<PostEntity>{
        return this.postsService.createpost(payload)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    getAllPost():Promise<PostEntity[]>{
        return this.postsService.getAll() 
    }

    @Get(':idPost')
    @HttpCode(HttpStatus.OK)
    getPostById(@Param('idPost') idPost:string):Promise<PostEntity>{
        return this.postsService.getById(idPost)
    }

    @Delete(':idPost')
    @HttpCode(HttpStatus.OK)
    delePost(@Param('idPost') idPost:string):Promise<PostEntity>{
        return this.postsService.delete(idPost)
    }

    @Put(':idPost')
    @HttpCode(HttpStatus.OK)
    updatePost(@Param('idPost') idPost:string, @Body() payload:PostDto):Promise<PostEntity>{
        return this.postsService.update(idPost, payload)
    }
}
