const sql = require("./db.js");

const Search = function(search) {
    this.name = courses.name;
    this.img = courses.img;
    this.user_id = courses.user_id;
    this.price = courses.price;
    this.rating = courses.rating;
    this.description = courses.description;
    this.duration = courses.duration;
    this.code = courses.code;
    this.is_confirmed = courses.is_confirmed;
    this.created_by = courses.created_by;
    this.updated_on = courses.updated_on;
    this.updated_by = courses.updated_by;
    this.is_trash = courses.is_trash;
};
Search.All = (value, page,id, result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 10;
    let query = "(SELECT courses.id AS id,courses.name AS title, courses.duration AS duration,courses.price AS price, 'Online' AS location,courses.tags,courses.img AS img, courses.rating AS rating, 'course' AS stype FROM courses WHERE (name LIKE ? OR description like ? OR code like ? OR tags like ?) limit ?,10) UNION ALL (SELECT users.user_id AS id,users.fullname AS title, NULL AS duration, users.hour_price AS price,CONCAT(users.wilayat,',',users.locality) AS location, users.tags, users.picture AS img, users.rating AS rating, 'user' AS stype FROM users WHERE (fullname LIKE ? OR tags like ? OR about like ?) AND users.type != 'student' AND users.user_id != ?  limit ?,10)";
    let values = ['%' + value + '%', '%' + value + '%', '%' + value + '%', '%' + value + '%', offset, '%' + value + '%', '%' + value + '%', '%' + value + '%',id, offset]
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
Search.User = (value, page,id, result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 10;
    let query = "SELECT users.user_id AS id, users.fullname AS title, NULL AS duration,users.hour_price AS price,CONCAT(users.wilayat,',',users.locality) AS location, users.tags,users.picture AS img, users.rating AS rating, 'user' AS stype FROM users WHERE (fullname LIKE ? OR tags like ? OR about like ?) AND users.type != 'student' AND users.user_id != ? limit ?,10";
    let values = ['%' + value + '%', '%' + value + '%', '%' + value + '%',id, offset]
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
Search.Courses = (value, page, result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 10;
    let query = "SELECT courses.id AS id, courses.name AS title, courses.duration AS duration,courses.price AS price, 'Online' AS location,courses.tags, courses.img AS img, courses.rating AS rating, 'course' AS stype FROM courses WHERE (name LIKE ? OR description like ? OR code like ? OR tags like ?) limit ?,10";
    let values = ['%' + value + '%', '%' + value + '%', '%' + value + '%', '%' + value + '%', offset]
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
module.exports = Search;