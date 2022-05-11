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
Search.All = (value,result) => {
    let query = "SELECT courses.name AS title, courses.img AS img, courses.rating AS rating FROM courses WHERE (name LIKE '%?%' OR description like '%?%' OR code like '%?%' OR tags like '%?%') UNION ALL SELECT users.fullname AS title, users.picture AS img, users.rating AS rating FROM users WHERE (fullname LIKE '%?%' OR tags like '%?%' OR about like '%?%')   limit 0,10";
    sql.query(query,{value,value,value,value,value,value,value}, (err, res) => {
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