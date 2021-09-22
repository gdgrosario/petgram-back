import { BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import { PostDto } from '../dtos/post.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Posts') private readonly postModel: Model<Post>){}

    async createpost(payload:PostDto):Promise<Post>{
        const { author, pathPhoto, title, numberOfLikes } = payload
            
        if(!author || !pathPhoto || !title || !numberOfLikes) throw new BadRequestException('Verifique los campos, algunos son necesarios');

        const createPost = new this.postModel(payload)
        const post = await createPost.save()
        
        if(!post) throw new BadRequestException('Error al crear el usuario');

        return post 
    }

    async getAll():Promise<Post[]>{
        const post = await this.postModel.find()
        if(!post) throw new NotFoundException('No se encontro ningun publicación');
        return post
    }

    async getById(idPost:string):Promise<Post>{
        const checkId: RegExpMatchArray | null = idPost.match(/^[0-9a-fA-F]{24}$/)
        
        if(!checkId) throw new NotFoundException(`El id ${idPost} no es valido`);
        
        const findPost = await this.postModel.findById(idPost)
        if(!findPost) throw new NotFoundException('No se encontro la publicación');
        
        return await this.postModel.findById(idPost)
    }

    async delete(idPost:string):Promise<Post>{
        const checkId: RegExpMatchArray | null = idPost.match(/^[0-9a-fA-F]{24}$/)

        if(!checkId) throw new NotFoundException(`El id ${idPost} no es valido`);

        const findPost = await this.postModel.findById(idPost)
        if(!findPost) throw new NotFoundException('No se encontro la publicación');

        return await this.postModel.findByIdAndDelete(idPost)
    }

    async update(idPost:string, payload:PostDto):Promise<Post>{
        const checkId: RegExpMatchArray | null = idPost.match(/^[0-9a-fA-F]{24}$/)
        const { author, pathPhoto, title, numberOfLikes } = payload

        if(!checkId) throw new NotFoundException(`El id ${idPost} no es valido`);

        const findPost = await this.postModel.findById(idPost)
        if(!findPost) throw new NotFoundException('No se encontro la publicación');

        if(!author || !pathPhoto || !title || !numberOfLikes) throw new BadRequestException('Verifique los campos, algunos son necesarios');

        return await this.postModel.findByIdAndUpdate(idPost, payload, {new: true})
    }
}