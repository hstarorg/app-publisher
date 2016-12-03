const express = require('express');
const multer = require('multer');
const router = new express.Router();
const biz = require('./biz');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}.zip`);
  }
})
const upload = multer({ storage });

router.get('/', biz.getIndex);
router.post('/upload', upload.single('file'), biz.uploadProgram);

// 默认启动一次
biz.startApp();

module.exports = router;