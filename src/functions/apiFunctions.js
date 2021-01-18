const Database = require('../database/index');
const {createToken, verifyToken} = require('./jwt');
const base = new Database();

const login = async (req, res) => {
    const user = await base.findUser([req.email, req.password]);
    if (user) {
        res.status(200).send({"token": createToken(user)});
    } else {
        res.status(422).send({
                    "field":"password",
                    "message":"Wrong email or password"
                });
    }
}

const registration = async(req, res) => {
    const user = await base.findUser([req.email, req.password]);
    if (user) {
        res.status(422).send({
            "field":"email",
            "message":"email is exist"
        });
    } else {
        const newUser = [req.name, req.email, req.password, req.phone];
        await base.addUser(newUser);
        res.status(200).send({"token": createToken(user)});
    }
}

const getCurrentUser = async(authorization, res) => {
    const user = verifyToken(authorization);
    const userData = await base.findUser([user.email, user.password]);
    if (userData) {
        res.status(200).send({
        "id": userData[0].id,
        "phone": userData[0].phone,
        "name": userData[0].name,
        "email": userData[0].email
        });
    } else {
        res.status(401);
    }
}


module.exports = {
    login,
    registration,
    getCurrentUser
}