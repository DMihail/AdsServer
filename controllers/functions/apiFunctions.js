const Database = require('../database/index');
const {createToken, verifyToken} = require('./jwt');
const {createFolders, saveImage} = require('../fs/index');
const base = new Database();

const login = async (req, res) => {
    const user = await base.getUser([req.email, req.password]);
    console.log(user)
    if (user) {
        res.status(200).send({"token": createToken(user)});
    }
}

const getUserData = async (authorization) => {
    const user = verifyToken(authorization);
    if (!user) {
        return null;
    }

    const data = await base.getUser( [user.email, user.password ]);
    return {id, phone, name, email} = data[0];

}

const registration = async(req, res) => {
    const user = await base.findUser([req.email, req.password]);
    if (user) {
        res.status(422).send({
            "field":"email",
            "message":"email is exist"
        });
    }
        const newUser = [req.name, req.email, req.password, req.phone];
        await base.addUser(newUser);
        res.status(200).send({"token": createToken({email: req.email, password: req.password})});
}

const getCurrentUser = async(authorization, res) => {
    const userData = await getUserData(authorization);
    console.log(userData)
    if (userData) {
        res.status(200).send({
        "id": userData.id,
        "phone": userData.phone,
        "name": userData.name,
        "email": userData.email
        });
    } else {
        res.status(401).send({});
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
    const data = await getUserData(req.headers.authorization);

    if (data) {
        const {id, phone, name, email} = data;
        const item = [date, req.body.title, req.body.price, "", id, JSON.stringify({id, phone, email, name})];

        const result = await base.createItem(item);

        const endItem = {
            id: result.insertId,
            created_at: date,
            title: req.body.title,
            price: req.body.price,
            image: "",
            user_id: id,
            user: {
                id: id,
                phone: phone,
                name: name,
                email: email
            }
        }

        if (!result) {
            res.status(403).send({});
        } else {
            res.status(200).send(endItem);
        }
    } else {
        res.status(401).send({});
    }
}

const getItems = async (authorization, res) => {
        const {id, phone, name, email} = await getUserData(authorization);
        const userData = JSON.stringify({id, phone, email, name});
        const items = await base.getItems(userData);
         if (items.length) {
             res.status(200).send(items);
            } else {
                res.status(404).send({});
            }
}


const getItem = async (req, res = null) => {
        const {id, phone, name, email} = await getUserData(req.headers.authorization);
        const userData = [JSON.stringify({id, phone, email, name}), req.params.id];
        const item = await base.getItem(userData);
        if (res) {
            if (item.length) {
                res.status(200).send(item);
            } else {
                res.status(404).send({});
            }
        } else {
            return item[0];
        }

}

const deleteItem = async (req, res) => {
        const {id, phone, name, email} = await getUserData(req.headers.authorization);
        const userData = [JSON.stringify({id, phone, email, name}), req.params.id];
        const item = await base.deleteItem(userData, id);
        if (item) {
            res.status(200).send({});
        } else {
            res.status(404).send({});
        }
}

const updateItem = async (req, res) => {
        const {id, phone, name, email} = getUserData(req.headers.authorization);
        const userData = [req.body.title, req.body.price,  req.params.id, JSON.stringify({id, phone, email, name}),];
        try {
            await base.updateItem(userData, id);
            const item = await base.getItem(userData);
                res.status(200).send(item);
        } catch (e) {
            res.status(403).send({});
        }


}

const findUserFromBase = async (email, password) => {
    return await base.findUser([email, password]);
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
    deleteItem,
    findUserFromBase
}