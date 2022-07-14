const sql = require("./db.js");

const Category = function(category) {
    this.title = category.name;
    this.img = category.img;
    this.created_by = category.created_by;
    this.updated_on = category.updated_on;
    this.updated_by = category.updated_by;
    this.is_trash = category.is_trash;
};
Category.fetchAll = (result) => {
    let query = "SELECT * FROM categories where is_trash != 1 ";
    sql.query(query, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
Category.getAllCourses = (userID,id,page,result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 10;
    let query = "SELECT * FROM courses LEFT JOIN users ON users.user_id = courses.user_id where cat_id = ? AND user_id != ? LIMIT ?,10 ";
    sql.query(query,[id,userID,offset], (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
module.exports = Category;