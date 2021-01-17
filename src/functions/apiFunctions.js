const Database = require('../database/index');
const {createToken} = require('./jwt');
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

const getCurrentUser = async(req, res) => {
    // console.log(req)
    // const newUser = [req.name, req.email, req.password, req.phone];
    // console.log(newUser)
    // await base.findUser([req.email, req.password]);
    // // base.addUser(newUser);
}


module.exports = {
    login,
    registration,
    getCurrentUser
}