const mysql = require('mysql2/promise');
const {massTable, createBase, useBase, insertUser, findUser} = require('./mySqlCommand');

module.exports = class Database {
    constructor() {
        this.connection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: "root",
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        this.createBase().then({

        }).catch(e => {
            console.log(e)
        })
    }

    async createBase() {
        try {
            await this.connection.query(createBase)
            console.log("База данных создана");
        } catch (err){
            console.log(err);
        }
        await this.useBase();
    }

    async useBase() {
        try {
            await this.connection.query(useBase)
            console.log("База данных используется");
        } catch (err) {
            console.log(err);
        }

        for (let i = 0; i < massTable.length; i++) {
            await this.createTable(massTable[i]);
        }
    }

    async createTable(table){
        try{
            await this.connection.query(table);
            console.log("Таблица создана");
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
        console.log(user)
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
}

