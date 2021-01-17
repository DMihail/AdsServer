const createUserTable = `CREATE TABLE IF NOT EXISTS users (
          id int primary key auto_increment,
          name varchar(255) not null,
          email nvarchar(255) not null,
          password nvarchar(255) not null,
          phone nvarchar(255) not null
        )`;

const createBase = "CREATE DATABASE IF NOT EXISTS AdsServer"

const useBase = "USE AdsServer";

module.exports = {
    createUserTable,
    createBase,
    useBase
}