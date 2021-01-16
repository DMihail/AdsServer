// const mysql = require("mysql2");
import mysql from 'mysql2'






connection.query("USE usersdb2",
    function(err, results) {
        if(err) console.log(err);
        else console.log("База данных используется");
    });



const sql = `create table if not exists users(
  id int primary key auto_increment,
  name varchar(255) not null,
  email nvarchar(255) not null,
  password nvarchar(255) not null,
  phone nvarchar(255) not null
)`;

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица создана");
});
connection.end();

export default class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            // database: "usersdb",
            password: "root"
        });
    }

    createBase() {
        connection.query("CREATE DATABASE IF NOT EXISTS AdsServer ",
            function(err, results) {
                if(err) console.log(err);
                else console.log("База данных создана");
            });
    }
}

