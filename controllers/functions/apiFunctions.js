const Database = require('../database/index');
const {createToken, verifyToken} = require('./jwt');
const {createFolders, saveImage} = require('../fs/index');
const base = new Database();

const login = async (req, res) => {
    const user = await base.getUser([req.email, req.password]);
    if (user) {
        res.status(200).send({"token": createToken(user)});
    } else {
        res.status(422).send({
                    "field":"password",
                    "message":"Wrong email or password"
                });
    }
}

const getUserData = async (authorization) => {
    const user = verifyToken(authorization);
    const data = await base.getUser([user.email, user.password]);
    return  {id, phone, name, email} = data[0];
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
    const userData = await getUserData(authorization);
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

const uploadItemImage = async (req, res) => {
    const mimeType = req.headers['content-type'].split('/')[1];
    const {id, phone, name, email} = await getUserData(req.headers.authorization);

    const pathPart = [`/${id}`, `/${req.params.id}`]
    let path = 'public/images';
    for (let i = 0; i < pathPart.length; i++) {
        path += pathPart[i];
        createFolders(path);
    }
    path = `${path}/image.${mimeType}`;

    saveImage(req, res, path);

    path = path.replace('public', 'http://localhost:3000');

    const item = [path, req.params.id, JSON.stringify({id, phone, email, name})];
    await base.updateItemImage(item);
}

const createItem = async (req, res) => {

    const date = new Date();
    const {id, phone, name, email} = await getUserData(req.headers.authorization);
    const item = [date, req.body.title, req.body.price, "", person[0].id, JSON.stringify({id, phone, email, name})];

    if (user) {
        await base.createItem(item);
        res.status(200).send(item);
    } else {

    }
}

const getItems = async (authorization, res) => {
        const {id, phone, name, email} = await getUserData(authorization);
        const userData = JSON.stringify({id, phone, email, name});
        const items = await base.getItems(userData);
        res.status(200).send(items);
}


const getItem = async (req, res) => {
        const {id, phone, name, email} = getUserData(req.headers.authorization);
        const userData = [JSON.stringify({id, phone, email, name}), req.params.id];
        const item = await base.getItem(userData, id);
        res.status(200).send(item);
}

const deleteItem = async (req, res) => {
        const {id, phone, name, email} = getUserData(req.headers.authorization);
        const userData = [JSON.stringify({id, phone, email, name}), req.params.id];
        const item = await base.deleteItem(userData, id);
        res.status(200).send(item);
}

const updateItem = async (req, res) => {
        const {id, phone, name, email} = getUserData(req.headers.authorization);
        const userData = [req.body.title, req.body.price,  req.params.id, JSON.stringify({id, phone, email, name}),];
        const item = await base.updateItem(userData, id);
        res.status(200).send(item);
}



module.exports = {
    login,
    registration,
    getCurrentUser,
    uploadItemImage,
    createItem,
    getItems,
    getItem,
    updateItem,
    deleteItem
}