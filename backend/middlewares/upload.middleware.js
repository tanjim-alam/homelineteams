const multer = require('multer');

// Use memory storage so files go directly to Cloudinary
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image uploads are allowed'));
  }
};

// 🔹 Single file upload (generic)
const uploadSingle = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single("image");

// 🔹 Multiple files upload (generic)
const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).array("images", 10);

// 🔹 Category upload (main image + OG image)
const uploadCategory = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).fields([
  { name: "image", maxCount: 1 },               // Main image
  { name: "metaData[ogImage]", maxCount: 1 }    // OG image
]);

// 🔹 Product upload (multiple images + OG image)
const uploadProduct = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).fields([
  { name: "images", maxCount: 10 },             // Product gallery
  { name: "metaData[ogImage]", maxCount: 1 }    // OG image
]);

// 🔹 Debugging middleware (optional)
const debugUpload = (req, res, next) => {
  console.log("=== UPLOAD DEBUG ===");
  console.log("Headers:", req.headers);
  console.log("Body (before multer):", req.body);
  console.log("Files (before multer):", req.files);
  next();
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadCategory,
  uploadProduct,
  debugUpload
};
