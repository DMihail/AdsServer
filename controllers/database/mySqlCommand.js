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
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE )`;

const massTable = [createUserTable, createItemsTable];

const createBase = "CREATE DATABASE IF NOT EXISTS AdsServer"

const useBase = "USE AdsServer";

const insertUser = "INSERT INTO users(name, email, password, phone) VALUES(?, ?, ?, ?)";

const insertItem = "INSERT INTO items(created_at, title, price, image, user_id) VALUES(?, ?, ?, ?, ?);";

const findUser = `SELECT * FROM users WHERE email=? AND password=?`;

const selectAllItems = `SELECT items.id, created_at, title, price, image, user_id, name, phone FROM items  JOIN users ON items.user_id = users.id WHERE user_id=?`;

const selectItem = `SELECT items.id, created_at, title, price, image, user_id, name, phone  FROM items  JOIN users ON items.user_id = users.id WHERE items.user_id=? AND items.id=?`;

const uploadImage = `UPDATE items SET image=? WHERE id=? AND user_id=?`;

const updateItem = `UPDATE items SET title=?, price=? WHERE id=? AND user_id=?`;

const deleteItem = `DELETE FROM items WHERE user_id=? AND id=?`;


module.exports = {
    massTable,
    createBase,
    useBase,
    insertUser,
    findUser,
    insertItem,
    uploadImage,
    selectAllItems,
    selectItem,
    updateItem,
    deleteItem
}
