import { Injectable, BadRequestException } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
const toStream = require('buffer-to-stream')

@Injectable()
export class CloudinaryService {
  async uploadAvatar (file:Express.Multer.File, nickName:string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({
        folder: nickName,
        transformation:[
          { width: 600, height: 600, crop: "scale" }
        ]
      }, (error, result) => {
        if (error) return reject(error)
        resolve(result)
      })
      toStream(file.buffer).pipe(upload)
    })
  }

  async removeMedia (publicId:string): Promise<void> {
    try {
      await v2.uploader.destroy(publicId)
    } catch (error) {
      throw new BadRequestException('Error to remove avatar')
    }
  }

  async updateAvatar (publicId:string, file:Express.Multer.File, nickName:string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      await this.removeMedia(publicId)
      return await this.uploadAvatar(file, nickName)
    } catch (error) {
      throw new BadRequestException('Error to update avatar')
    }
  }
}
