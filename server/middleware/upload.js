import multer from 'multer';

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml'
]);

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  if (!ALLOWED_MIME_TYPES.has(file.mimetype.toLowerCase())) {
    return cb(
      new Error(`Unsupported file type: ${file.mimetype}. Allowed formats: JPG, PNG, WEBP, GIF, SVG.`),
      false
    );
  }
  cb(null, true);
}

export const uploadSingleImage = (fieldNames = ['file', 'image']) => {
  const upload = multer({
    storage,
    limits: {
      fileSize: MAX_FILE_SIZE
    },
    fileFilter
  }).fields([
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            error: `File size exceeds the 8MB limit. Please upload a smaller image.`
          });
        }
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      req.file = req.files?.file?.[0] || req.files?.image?.[0] || null;
      next();
    });
  };
};
