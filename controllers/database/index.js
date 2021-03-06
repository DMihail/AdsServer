const mysql = require('mysql2/promise');
const {password, host, user} = require('../../config/index');
const {useBase, insertUser,
    findUser, insertItem, uploadImage, selectAllItems,
    selectItem, updateItem, deleteItem} = require('./mySqlCommand');

module.exports = class Database {
    constructor() {
        this.connection = mysql.createPool({
            host: host,
            user: user,
            password: password,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        this.useBase();
    }

    async useBase() {
        try {
            await this.connection.query(useBase)
            console.log("База данных используется");
        } catch (err) {
            console.log(err);
        }
    }

    async addUser(newUser) {
        try {
            await this.connection.query(insertUser, newUser);
            return true;
        } catch (err) {
            return false;
            console.log(err)
        }
    }

    async findUser(user) {
        try {
            const result = await this.connection.query(findUser, user);
            if (result[0].length < 1) {
               return false;
            }
            return true;
        } catch (err) {
            console.log(err);
            return null;
        }
    }


    async getUser(user) {
        try {
            const result = await this.connection.query(findUser, user);
            if (result.length < 1) {
                return null;
            }
            return result[0];
        } catch (err) {
            console.log(err);
            return null;
        }
    }


    async createItem(item) {
        try {
           const result = await this.connection.query(insertItem, item);
           return result[0];
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async updateItemImage(params) {
        try {
            return await this.connection.query(uploadImage, params);
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    async getItems(user) {
        try {
           const result = await this.connection.query(selectAllItems, user);
           return result[0];
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async getItem(user) {
        try {
            const result = await this.connection.query(selectItem, user);
            return result[0];
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async updateItem(item) {
        try {
            const result = await this.connection.query(updateItem, item);
            return result[0];
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async deleteItem(item) {
        try {
            const result = await this.connection.query(deleteItem, item);
            return result[0];
        } catch (err) {
            console.log(err);
            return null;
        }
    }

}

