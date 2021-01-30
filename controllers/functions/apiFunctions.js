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
    const data = await getUserData(req.headers.authorization);
    if (data) {
        const {id} = data;
        const pathPart = [`/${id}`, `/${req.params.id}`]
        let path = 'public/images';
        for (let i = 0; i < pathPart.length; i++) {
            path += pathPart[i];
            createFolders(path);
        }
        path = `${path}/image.${mimeType}`;

        saveImage(req, res, path);

        path = path.replace('public', 'http://localhost:3000');
        const item = [path, req.params.id, id];
        const update = await base.updateItemImage(item);
        if (update) {
            const result = await base.getItem([id, req.params.id]);
            res.status(200).send(createItemsResponse(result));
        } else {
            res.status(500).send({});
        }
    } else {
        res.status(403).send({});
    }
}

const createItem = async (req, res) => {

    const date = new Date();
    const data = await getUserData(req.headers.authorization);

    if (data) {
        const {id} = data;
        const item = [date, req.body.title, req.body.price, "", +id];
        const createItem = await base.createItem(item);
        const result = await base.getItem([+id, +createItem.insertId]);
        if (!result) {
            res.status(403).send({});
        } else {
            res.status(200).send(createItemsResponse(result));
        }
    } else {
        res.status(401).send({});
    }
}

const getItems = async (authorization, res) => {
        const {id} = await getUserData(authorization);
        const items = await base.getItems([id]);
        const newItems = createItemsResponse(items);
         if (newItems.length) {
             res.status(200).send(newItems);
            } else {
                res.status(404).send({});
            }
}

const createItemsResponse = (massItems) => {
    const newMassItems = [];
    for (let i = 0; i < massItems.length; i++) {
        const obj = {
            id: massItems[i].id,
            created_at: massItems[i].created_at,
            title: massItems[i].title,
            price: massItems[i].price,
            image: massItems[i].image,
            user_id: massItems[i].user_id,
            user: {
                id: massItems[i].user_id,
                phone: massItems[i].phone,
                name: massItems[i].name,
                email: massItems[i].email
                 }
            }
        newMassItems.push(obj);
    }
    return newMassItems;
}


const getItem = async (req, res = null) => {
        const {id} = await getUserData(req.headers.authorization);
        const item = await base.getItem([id, +req.params.id]);
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
        const data = await getUserData(req.headers.authorization);
        if (data) {
            const {id} = data
            const item = await base.deleteItem([id, +req.params.id]);
            if (item) {
                res.status(200).send({});
            } else {
                res.status(404).send({});
            }
        } else {
            res.status(401).send({});
        }
}

const updateItem = async (req, res) => {
        const {id} = await getUserData(req.headers.authorization);
        try {
            await base.updateItem([req.body.title, req.body.price, +req.params.id, id]);
            const item = await base.getItem([id, +req.params.id]);
            res.status(200).send(createItemsResponse(item));
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
