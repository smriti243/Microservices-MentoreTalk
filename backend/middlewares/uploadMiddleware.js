const multer = require('multer');
const path = require('path');

// Define storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the folder where resumes will be saved
    cb(null, 'uploads/resumes');
  },
  filename: (req, file, cb) => {
    // Define the filename format
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Filter the file type for resume uploads (only PDF, DOC, DOCX)
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /pdf|doc|docx/;
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only .pdf, .doc, and .docx formats are allowed!'));
  }
};

// Initialize multer with the defined storage, file limits, and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Set file size limit to 10MB
  fileFilter: fileFilter
});

module.exports = upload;
