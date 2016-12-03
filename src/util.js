'use strict';
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const unzipFile = (zipFilePath, folderPath) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    JSZip.loadAsync(fs.readFileSync(zipFilePath), { base64: false, createFolders: true })
      .then((zip) => {
        var keys = Object.keys(zip.files);
        let currentCount = 0, total = keys.length;
        keys.forEach((key, i) => {
          var zipFile = zip.files[key];
          var tmpPath = path.join(folderPath, zipFile.name);
          if (zipFile.dir) {
            if (!fs.existsSync(tmpPath)) {
              fs.mkdirSync(tmpPath);
            }
            currentCount++;
            if (currentCount === total) {
              resolve(folderPath);
            }
          } else {
            zipFile.async('binarystring').
              then((b) => {
                fs.writeFileSync(tmpPath, b, 'binary');
                currentCount++;
                if (currentCount === total) {
                  resolve(folderPath);
                }
              }).catch(err => reject(err));
          }
        });
      })
      .catch(err => reject(err));
  });
};

module.exports = {
  unzipFile
};