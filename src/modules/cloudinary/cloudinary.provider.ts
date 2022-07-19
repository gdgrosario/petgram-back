import { v2 } from "cloudinary";
import { ConfigType } from "@nestjs/config";
import { Provider } from "@nestjs/common";
import config from "src/config/config";

export const CloudinaryProvider: Provider = {
  provide: "Cloudinary",
  inject: [config.KEY],
  useFactory: (configService: ConfigType<typeof config>) => {
    return v2.config({
      cloud_name: configService.cloudinary.cloud_name,
      api_key: configService.cloudinary.api_key,
      api_secret: configService.cloudinary.api_secret
    });
  }
};
