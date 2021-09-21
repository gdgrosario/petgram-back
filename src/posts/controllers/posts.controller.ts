import { Body, Controller, Get, HttpStatus, Res , Post, HttpCode, BadRequestException, NotFoundException, Param, Delete, Put, InternalServerErrorException} from "@nestjs/common";
import { PostDto } from "../dtos/post.dtos";
import { PostsService } from '../services/posts.service';


@Controller("posts")
export class PostsController {
    constructor(private postsService: PostsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(@Res() res, @Body() payload: PostDto):Promise<Response>{
        const { author, pathPhoto, title, numberOfLikes } = payload
            
        if(!author || !pathPhoto || !title || !numberOfLikes) throw new BadRequestException('Verifique los campos, algunos son necesarios');

        const post = await this.postsService.post(payload)
        if(!post) throw new BadRequestException('Error al crear el usuario');

        return res.json({
            post
        })
    
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllPost(@Res() res):Promise<Response>{
        const post = await this.postsService.getAll()
       
        if(!post) throw new NotFoundException('No se encontro ningun publicación');

        return res.json({
            post
        })
    }

    @Get(':idPost')
    @HttpCode(HttpStatus.OK)
    async getPostById(@Res() res, @Param('idPost') idPost:string):Promise<Response>{
        const checkId: RegExpMatchArray | null = idPost.match(/^[0-9a-fA-F]{24}$/)
        
        if(!checkId) throw new NotFoundException(`El id ${idPost} no es valido`);
        
        const findPost = await this.postsService.getById(idPost)
        if(!findPost) throw new NotFoundException('No se encontro la publicación');

        const post = await this.postsService.getById(idPost)
       
        return res.json({
            post
        })
    }

    @Delete(':idPost')
    @HttpCode(HttpStatus.OK)
    async delePost(@Res() res, @Param('idPost') idPost:string):Promise<Response>{
        const checkId: RegExpMatchArray | null = idPost.match(/^[0-9a-fA-F]{24}$/)

        if(!checkId) throw new NotFoundException(`El id ${idPost} no es valido`);

        const findPost = await this.postsService.getById(idPost)
        if(!findPost) throw new NotFoundException('No se encontro la publicación');
        
        const post = await this.postsService.delete(idPost)
       
        return res.json({

            post
        })
    }

    @Put(':idPost')
    @HttpCode(HttpStatus.OK)
    async updatePost(@Res() res, @Param('idPost') idPost:string, @Body() payload:PostDto):Promise<Response>{
        const checkId: RegExpMatchArray | null = idPost.match(/^[0-9a-fA-F]{24}$/)
        const { author, pathPhoto, title, numberOfLikes } = payload

        if(!checkId) throw new NotFoundException(`El id ${idPost} no es valido`);

        const findPost = await this.postsService.getById(idPost)
        if(!findPost) throw new NotFoundException('No se encontro la publicación');

        if(!author || !pathPhoto || !title || !numberOfLikes) throw new BadRequestException('Verifique los campos, algunos son necesarios');
        
        const post = await this.postsService.update(idPost, payload)
       
        return res.json({
            post
        })
    }
}
