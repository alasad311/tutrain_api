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
        sql.query("SELECT * FROM users WHERE users.user_id = ?", id, (err, res) => {
            let query = "SELECT * FROM((SELECT courses.id AS id,courses.name AS title, courses.duration AS duration,courses.price AS price, 'Online' AS location,courses.tags,courses.img AS img, courses.rating AS rating, 'course' AS stype, true AS showRate FROM courses LEFT JOIN users ON users.user_id = courses.user_id WHERE (courses.name LIKE ? OR courses.description like ? OR courses.code like ? OR courses.tags like ?) AND courses.is_trash != 1 AND courses.user_id != ? AND users.is_trash != 1) UNION ALL (SELECT users.user_id AS id,users.fullname AS title, NULL AS duration, users.hour_price AS price,users.address AS location, users.tags, users.picture AS img, users.rating AS rating, 'user' AS stype, true AS showRate FROM users WHERE (fullname LIKE ? OR tags like ? OR about like ?) AND users.type != 'student' AND users.user_id != ? AND users.country = ? AND users.tags IS NOT NULL   AND is_trash != 1 AND is_active = 1 ) UNION ALL (SELECT course_session.id AS id, course_session.session_name AS title, course_session.duration AS duration,course_session.price AS price, course_session.location AS location,course_session.tags, course_session.img AS img, null AS rating, 'session' AS stype, false AS showRate FROM course_session WHERE (session_name LIKE ? OR description like ? OR location like ? OR tags like ?) AND user_id != ? AND enddate <= NOW()  AND is_trash != 1 ))A LIMIT ?,10";
            let values = ['%' + value + '%', '%' + value + '%', '%' + value + '%', '%' + value + '%',id, '%' + value + '%', '%' + value + '%', '%' + value + '%',id,res[0]['country'], '%' + value + '%', '%' + value + '%', '%' + value + '%', '%' + value + '%',id,offset]
            sql.query(query, values, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                console.log("users: ", res);
                result(null, res);
            });
        });
};
Search.User = (value, page,id, result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 10;
        sql.query("SELECT * FROM users WHERE users.user_id = ?", id, (err, res) => {
            let query = "SELECT users.user_id AS id, users.fullname AS title, NULL AS duration,users.hour_price AS price,users.address AS location, users.tags,users.picture AS img, users.rating AS rating, 'user' AS stype, true AS showRate FROM users WHERE (fullname LIKE ? OR tags like ? OR about like ?) AND users.type != 'student' AND users.user_id != ? AND users.country = ? AND users.tags IS NOT NULL  AND is_trash != 1 AND is_active = 1 limit ?,10";
            let values = ['%' + value + '%', '%' + value + '%', '%' + value + '%',id,res[0]['country'], offset]
            sql.query(query, values, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                console.log("users: ", res);
                result(null, res);
            });
        });
    
};
Search.Courses = (value, page,id, result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 10;
    let query = "SELECT courses.id AS id, courses.name AS title, courses.duration AS duration,courses.price AS price, 'Online' AS location,courses.tags, courses.img AS img, courses.rating AS rating, 'course' AS stype, true AS showRate FROM courses LEFT JOIN users ON users.user_id = courses.user_id WHERE (courses.name LIKE ? OR courses.description like ? OR courses.code like ? OR courses.tags like ?) AND courses.is_trash != 1 AND users.is_trash != 1 AND courses.user_id != ? limit ?,10";
    let values = ['%' + value + '%', '%' + value + '%', '%' + value + '%', '%' + value + '%', id,offset]
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
Search.searchSessions = (value, id, page, result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 10;
    let query = "SELECT course_session.id AS id, course_session.session_name AS title, course_session.duration AS duration,course_session.price AS price, course_session.location AS location,course_session.tags, course_session.img AS img, null AS rating, 'session' AS stype, false AS showRate FROM course_session WHERE (session_name LIKE ? OR description like ? OR location like ? OR tags like ?) AND user_id != ? AND enddate <= NOW() AND is_trash != 1 limit ?,10";
    let values = ['%' + value + '%', '%' + value + '%', '%' + value + '%', '%' + value + '%', id,offset]
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