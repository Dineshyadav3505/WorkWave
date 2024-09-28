import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadOnCloudinary = async (file, folder) => {

  const buffer = await file.arrayBuffer();
  const bites = Buffer.from(buffer);

  return new Promise(async (resolve, reject) => {
    
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        async (err, result) => {
          if (err) {
            console.error("Error while uploading image to cloudinary", err);
            return reject("Error", err.message);
          }
          return resolve(result);
        }
      )
      .end(bites);
  });
};
