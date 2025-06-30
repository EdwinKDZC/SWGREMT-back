import cloudinary from "../utils/cloudinary.js";

const upload = async (file) => {

    if (!file) return null

    const fileStr = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(fileStr, {
        folder: "products",
    });
    return result.secure_url
}

export default upload;
