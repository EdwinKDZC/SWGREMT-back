import multer from "multer";
import path from "path";

const storage = multer.memoryStorage()
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permiten imagenes"), false);
    }
}
const uploadImage = multer({ storage, fileFilter })

export default uploadImage;
