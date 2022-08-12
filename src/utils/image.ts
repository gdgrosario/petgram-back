import { existsSync, unlinkSync } from "fs";
import { diskStorage } from "multer";
const imageTypes = ["image/png", "image/jpeg"];

const ValidateImage = (_req, file: Express.Multer.File, callback) => {
  if (imageTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const removeFile = (path: string) => {
  if (existsSync(path)) {
    unlinkSync(path);
  }
};

const storage = diskStorage({
  destination: "./uploads",
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

export { ValidateImage, removeFile, storage };
