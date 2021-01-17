const jwt = require('jsonwebtoken');
const {secret} = require('../../config/index');


const createToken = (user) => {
    return  jwt.sign({name: user[0].name,  email: user[0].email},secret, {expiresIn: 60 * 60});
}

const verifyToken = (token) => {
    return  jwt.verify(token, secret);
}

module.exports = {
    createToken
}