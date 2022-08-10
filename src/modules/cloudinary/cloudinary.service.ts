import { Injectable, BadRequestException } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";

@Injectable()
export class CloudinaryService {
  async uploadAvatar(
    file: Express.Multer.File,
    nickName: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return await v2.uploader.upload(file.path, {
      folder: nickName,
      transformation: [{ width: 600, height: 600, crop: "scale" }]
    });
  }

  async uploadPost(
    file: Express.Multer.File,
    nickName: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return await v2.uploader.upload(file.path, {
      folder: `${nickName}/posts`,
      transformation: [{ width: 800, height: 800, crop: "scale" }]
    });
  }

  async removeMedia(publicId: string): Promise<void> {
    try {
      await v2.uploader.destroy(publicId);
    } catch (error) {
      throw new BadRequestException("Error to remove");
    }
  }

  async updateAvatar(
    publicId: string,
    file: Express.Multer.File,
    nickName: string
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      await this.removeMedia(publicId);
      return await this.uploadAvatar(file, nickName);
    } catch (error) {
      throw new BadRequestException("Error to update avatar");
    }
  }
}
