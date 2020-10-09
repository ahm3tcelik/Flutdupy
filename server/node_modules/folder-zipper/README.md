# Folder Zipper
Zips a folder of files.

## Usage

```javascript
const folderZipper = require('folder-zipper');

folderZipper('/path/to/folder', '/path/to/archive.zip')
.then(result => {
    console.log('Done!');
})
.catch(error => {
    console.log(error);
});
```
