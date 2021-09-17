import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PostDto } from '../dtos/post.dtos';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsService {
    constructor(@InjectModel('Posts') private readonly postModel: Model<Post>){}

    async post(payload:PostDto):Promise<Post>{
        const createPost = new this.postModel(payload)
        return await createPost.save()
       
    }

    async getAll():Promise<Post[]>{
        const post = await this.postModel.find()
        return post
    }

    async getById(id:string):Promise<Post>{
        const post = await this.postModel.findById(id)
        return post
    }

    async delete(id:string):Promise<Post>{
        const post = await this.postModel.findByIdAndDelete(id)
        return post
    }

    async update(id:string, payload:PostDto):Promise<Post>{
        const post = await this.postModel.findByIdAndUpdate(id, payload, {new: true})

        console.log(post)
        return post
    }
}