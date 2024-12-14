const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/authMiddleware');

// Multer configuration (same as before)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'feed-images'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = `feed-image-${uniqueSuffix}${fileExtension}`;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

module.exports = (io) => {
  const router = express.Router();
  const feedController = require('../controllers/feedController')(io);

  router.post('/', authMiddleware, upload.single('image'), feedController.createPost);
  router.get('/', feedController.getPosts);

  return router;
};