const sql = require("./db.js");
const nested = require("node-mysql-nesting")
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
    let query = "SELECT *  FROM courses LEFT JOIN users ON users.user_id = courses.user_id where courses.is_confirmed = 1 AND users.email != ? ORDER BY id DESC LIMIT 0,5";
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
Courses.fetchCourseById = (id,result) => {
    let query = "SELECT *  FROM courses LEFT JOIN users ON users.user_id = courses.user_id where courses.is_confirmed = 1 AND courses.id = ?";
    sql.query(query,id, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
Courses.fetchCourseSections = (id,result) => {
    let query = "SELECT * FROM course_section LEFT JOIN course_content ON course_content.section_id = course_section.id WHERE course_id = ? ";
    var options = { sql: query, nestTables: true };
    var nestingOptions = [
        { tableName : 'course_section', pkey: 'id'},
        { tableName : 'course_section', pkey: 'id'},
        { tableName : 'course_content', pkey: 'id', fkeys:[{table:'course_section',col:'section_id'}]},
    ];
    sql.query(options,id, (err, response) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        var nestedRows = nested.convertToNested(response, nestingOptions);
        result(null, nestedRows);
    });
};
Courses.fetchCoursesOrderByUser = (id,user,result) => {
    let query = "SELECT *   FROM orders LEFT JOIN users ON users.user_id = orders.user_id  WHERE orders.course_id = ? AND users.email = ?";
    sql.query(query,[id,user], (err, res) => {
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