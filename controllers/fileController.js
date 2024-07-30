const asyncHandler = require('express-async-handler');
const File = require('../models/File');
const path = require('path');
const fs = require('fs');

const uploadFile = asyncHandler(async (req, res) => {
    const { originalname, path: filePath, size, mimetype } = req.file;

    const file = new File({
        user: req.user._id,
        filename: originalname,
        path: filePath,
        size,
        mimeType: mimetype,
    });

    const createdFile = await file.save();
    res.status(201).json(createdFile);
});

const getFiles = asyncHandler(async (req, res) => {
    const files = await File.find({ user: req.user._id });
    res.json(files);
});

const downloadFile = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);

    if (file) {
        res.download(file.path, file.filename);
    } else {
        res.status(404);
        throw new Error('File not found');
    }
});

const deleteFile = asyncHandler(async (req, res) => {
    const file = await File.findById(req.params.id);

    if (file) {
        fs.unlinkSync(file.path);
        await file.remove();
        res.json({ message: 'File removed' });
    } else {
        res.status(404);
        throw new Error('File not found');
    }
});

module.exports = {
    uploadFile,
    getFiles,
    downloadFile,
    deleteFile,
};
