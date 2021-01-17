const Database = require('../database/index');

const base = new Database();

const login = (req, res) => {
    console.log(req)
    const newUser = [];
    base.findUser()
}

const registration = (req, res) => {
    console.log(req)
    const newUser = [req.name, req.email, req.password, req.phone];
    console.log(newUser)
    base.findUser([req.email, req.password]);
    // base.addUser(newUser);
}


module.exports = {
    login,
    registration
}