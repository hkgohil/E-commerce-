import cloudinaryModule from "cloudinary";
import multer from "multer";

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: "dxmaiuu9d",
  api_key: "737157694465298",
  api_secret: "C0EpGNeK_3-aWbKBu13VBXA-I2U",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };