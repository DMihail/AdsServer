const Database = require('./database/index');
const {createToken, verifyToken} = require('./jwt');
const {createFolders, saveImage} = require('./fs/index');
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

const uploadItemImage = async (req, res) => {
    const user = verifyToken(req.headers.authorization);
    const mimeType = req.headers['content-type'].split('/')[1];

    const person = await base.findUser([user.email, user.password]);

    const {id, phone, name, email} = person[0];
    const pathPart = [`/${id}`, `/${req.params.id}`]
    let path = 'public/images';
    for (let i = 0; i < pathPart.length; i++) {
        path += pathPart[i];
        createFolders(path);
    }
    path = `${path}/image.${mimeType}`

    const item = [path, req.params.id, JSON.stringify({id, phone, email, name})];
    await base.updateItemImage(item);
    saveImage(req, res, path);
}

const createItem = async (req, res) => {
    const user = verifyToken(req.headers.authorization);
    const date = new Date();
    const person = await base.findUser([user.email, user.password]);
    const {id, phone, name, email} = person[0];
    const item = [date, req.body.title, req.body.price, "", person[0].id, JSON.stringify({id, phone, email, name})];
    if (user) {
        await base.createItem(item);
        res.status(200).send(item);
    } else {

    }
}

const getItems = async (authorization, res) => {
    const user = verifyToken(authorization);
    if (user) {
        const person = await base.findUser([user.email, user.password]);
        const {id, phone, name, email} = person[0];
        const userData = JSON.stringify({id, phone, email, name});
        const items = await base.getItems(userData);
        res.status(200).send(items);
    }
}


const getItem = async (req, res) => {
    const user = verifyToken(req.headers.authorization);
    if (user) {
        const person = await base.findUser([user.email, user.password]);
        const {id, phone, name, email} = person[0];
        const userData = [JSON.stringify({id, phone, email, name}), req.params.id];
        const item = await base.getItem(userData, id);
        res.status(200).send(item);
    }
}

const deleteItem = async (req, res) => {
    const user = verifyToken(req.headers.authorization);
    if (user) {
        const person = await base.findUser([user.email, user.password]);
        const {id, phone, name, email} = person[0];
        const userData = [JSON.stringify({id, phone, email, name}), req.params.id];
        const item = await base.deleteItem(userData, id);
        res.status(200).send(item);
    }
}

const updateItem = async (req, res) => {
    const user = verifyToken(req.headers.authorization);
    if (user) {
        const person = await base.findUser([user.email, user.password]);
        const {id, phone, name, email} = person[0];
        const userData = [req.body.title, req.body.price,  req.params.id, JSON.stringify({id, phone, email, name}),];
        const item = await base.updateItem(userData, id);
        res.status(200).send(item);
    }
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