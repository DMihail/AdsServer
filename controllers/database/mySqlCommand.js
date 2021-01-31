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
