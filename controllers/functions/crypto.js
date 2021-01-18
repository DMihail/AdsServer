const crypto = require('crypto');


const createCrypto = (password) => {
    const mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
    let mystr = mykey.update(password, 'utf8', 'hex');
    return mystr += mykey.final('hex');
}

const decipher = (hash) => {
    const mykey = crypto.createDecipher('aes-128-cbc', 'mypassword');
    let mystr = mykey.update(hash, 'hex', 'utf8');
    return mystr += mykey.final('utf8');
}

module.exports = {
    createCrypto,
    decipher
}