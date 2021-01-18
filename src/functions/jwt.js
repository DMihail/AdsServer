const jwt = require('jsonwebtoken');
const {createCrypto, decipher} = require('./crypto');
const {secret} = require('../../config/index');


const createToken = (user) => {
    const password = createCrypto(user[0].password);
    return  jwt.sign({email: user[0].email,  password}, secret, {expiresIn: 60 * 60});
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