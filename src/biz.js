const pm2 = require('pm2');
const util = require('./util');

var pId = 0;

const getIndex = (req, res, next) => {
  res.render('index');
};

const startApp = () => {
  pm2.start({
    script: 'webroot/index.js'
  });
};

const uploadProgram = (req, res, next) => {
  util.unzipFile(req.file.path, 'wwwroot/')
    .then(() => {
      console.log('unzip file');
      startApp();
      res.redirect('/');
    })
    .catch(reason => next(reason));
};

module.exports = {
  getIndex,
  uploadProgram,
  startApp
};

