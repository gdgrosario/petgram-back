const imageTypes = ["image/png", "image/jpeg"];
export const ValidateImage = (_req, file:Express.Multer.File, callback) => {
    if (imageTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null , false);
    }
};