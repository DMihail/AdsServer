const fs = require('fs-extra');


const createFolders = (path) => {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
}

const saveImage = (req, res, path) => {
    req.pipe(
        fs.createWriteStream(path)
    ).on('finish', () => {
        console.log('finish')
    });
}

module.exports = {
    createFolders,
    saveImage,
}