const sql = require("./db.js");

const Courses = function(courses) {
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
Courses.fetchAllNewCourses = (email,result) => {
    let query = "SELECT *  FROM courses LEFT JOIN users ON users.id = courses.user_id where is_confirmed = 1 AND users.email != ? ORDER BY id DESC LIMIT 0,5";
    sql.query(query,email, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
module.exports = Courses;