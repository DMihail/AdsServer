const fs = require('fs-extra');


const createFolders = (path) => {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
}

const saveImage = (req, res, path) => {
    req.pipe(
        fs.createWriteStream(`${path}/file.jpg`)
    ).on('finish', () => res.end('ok'));
}

module.exports = {
    createFolders,
    saveImage,
}