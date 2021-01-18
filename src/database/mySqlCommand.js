const createUserTable = `CREATE TABLE IF NOT EXISTS users (
          id int primary key auto_increment,
          name varchar(255) not null,
          email nvarchar(255) not null unique,
          password nvarchar(255) not null,
          phone nvarchar(255) not null
        )`;

const createItemsTable = `CREATE TABLE IF NOT EXISTS items (
          id int primary key auto_increment,
          created_at timestamp not null,
          title varchar(255) not null,
          price float not null,
          image nvarchar(255) not null,
          user_id int not null,
          user text not null
        )`;

const massTable = [createUserTable, createItemsTable];

const createBase = "CREATE DATABASE IF NOT EXISTS AdsServer"

const useBase = "USE AdsServer";

const insertUser = "INSERT INTO users(name, email, password, phone) VALUES(?, ?, ?, ?)";

const findUser = `SELECT * FROM users WHERE email=? AND password=?`;

module.exports = {
    massTable,
    createBase,
    useBase,
    insertUser,
    findUser
}