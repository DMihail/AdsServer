const mysql = require('mysql2');
const {createUserTable, createBase, useBase} = require('./mySqlCommand');

module.exports = class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root"
        });
        this.createBase();
    }

    createBase() {
        try {
            this.connection.query(createBase)
            console.log("База данных создана");
        } catch (err){
            console.log(err);
        }
        this.useBase();
    }

    useBase() {
        try {
            this.connection.query(useBase)
            console.log("База данных используется");
        } catch (err) {
            console.log(err);
        }
        this.createTable();
    }

    createTable(){
        try{
            this.connection.query(createUserTable);
            console.log("Таблица создана");
        } catch (err) {
            console.log(err);
        }
    }
}

