const jwt = require('jsonwebtoken');
const {createCrypto, decipher} = require('./crypto');
const {secret} = require('../../config/index');


const createToken = (user) => {
    const password = user[0] ? user[0].password : user.password;
    const email = user[0] ? user[0].email : user.email;
    const crypto = createCrypto(password);
    return  jwt.sign({email: email,  password: crypto}, secret, {expiresIn: 60 * 60});
}

const verifyToken = (token) => {
    try {
        const data = jwt.verify(token, secret);
        return {
            email: data.email,
            password: decipher(data.password)
        }
    }catch (err) {
        console.log("err verify token")
        return null;
    }
}

module.exports = {
    createToken,
    verifyToken
}