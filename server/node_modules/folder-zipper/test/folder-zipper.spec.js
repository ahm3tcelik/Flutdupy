
const path         = require('path');
const fs           = require('fs-extra');
const expect       = require('chai').expect;
const folderZipper = require('../index');

const archive = path.normalize(`${__dirname}/archive`);
const folder  = path.normalize(`${__dirname}/data`);
const fname   = path.normalize(`${archive}/${path.basename(folder)}-${Date.now()}.zip`);

describe(`Zip: ${folder}\n   to: ${fname}`, function () {

    this.timeout(30000);

    // Create test directories
    fs.ensureDirSync(archive);
    fs.ensureDirSync(folder);

    // Empty archive directory
    fs.emptyDirSync(archive);

    // Create data files
    if (!fs.existsSync(`${folder}/test-1.txt`)) {
        fs.writeFileSync(`${folder}/test-1.txt`, 'Hello 1 2 3');
        fs.writeFileSync(`${folder}/test-2.txt`, 'Hello 4 5 6');
    }

    it ('All actions complete!', () => {
        return folderZipper(folder, fname)
        .then(success => expect(success).to.equal(undefined))
        .catch(error => console.log(error));
    });
});
