const express = require('express');
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { uploadFile, getFiles, downloadFile, deleteFile } = require('../controllers/fileController');
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.route('/')
    .get(protect, getFiles)
    .post(protect, upload.single('file'), uploadFile);

router.route('/:id')
    .get(protect, downloadFile)
    .delete(protect, deleteFile);

module.exports = router;
