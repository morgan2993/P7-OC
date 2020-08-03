const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../controllers/upload');
const uploader = require('../middleware/multer-config');

router.post('/', auth, uploader.module, upload.fileUpload);

module.exports = router;