const fs       = require('fs-extra');
const path     = require('path');
const archiver = require('archiver');


module.exports = (folder, zipFile) => new Promise((resolve, reject) => {
    folder  = path.normalize(folder);
    zipFile = path.normalize(zipFile);

    fs.ensureDirSync(path.dirname(zipFile));

    const zip    = archiver('zip');
    const stream = fs.createWriteStream(zipFile);

    stream.on('close', () => resolve());

    zip.on('error', err => reject(err));
    zip.pipe(stream);
    zip.directory(folder, path.basename(zipFile, '.zip'));
    zip.finalize(err => {
        if (err) { reject(err); }
    });
});
