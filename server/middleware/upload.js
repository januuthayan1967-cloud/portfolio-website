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

const MAX_CV_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_CV_MIME_TYPES = new Set([
  'application/pdf',
  'application/x-pdf'
]);

function cvFileFilter(req, file, cb) {
  const mime = (file.mimetype || '').toLowerCase();
  const ext = (file.originalname || '').toLowerCase();

  if (!ALLOWED_CV_MIME_TYPES.has(mime) && !ext.endsWith('.pdf')) {
    return cb(
      new Error(`Unsupported file type: ${file.mimetype}. Only valid PDF documents (.pdf) are permitted.`),
      false
    );
  }
  cb(null, true);
}

export const uploadCvPdf = (fieldNames = ['file', 'cv', 'resume']) => {
  const upload = multer({
    storage,
    limits: {
      fileSize: MAX_CV_FILE_SIZE
    },
    fileFilter: cvFileFilter
  }).fields([
    { name: 'file', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            error: 'File size exceeds the 10MB maximum upload limit. Please upload a PDF under 10MB.'
          });
        }
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const file = req.files?.file?.[0] || req.files?.cv?.[0] || req.files?.resume?.[0] || null;
      if (!file) {
        return res.status(400).json({ error: 'No CV file provided in upload request.' });
      }

      // Strict PDF signature (magic bytes) validation: First 5 bytes must be %PDF-
      if (!file.buffer || file.buffer.length < 5 || file.buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
        return res.status(400).json({
          error: 'Invalid file signature: The uploaded file is not a valid PDF document.'
        });
      }

      req.file = file;
      next();
    });
  };
};
