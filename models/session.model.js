const sql = require("./db.js");
const nested = require("node-mysql-nesting")
const Session = function(session) {
    this.session_name = session.session_name;
    this.location = session.location;
    this.description = session.description;
    this.tags = session.tags;
    this.duration = session.duration;
    this.price = session.price;
    this.lang = session.lang;
    this.seats = session.seats;
    this.agenda = session.agenda;
    this.startdate = session.startdate;
    this.enddate = session.enddate;
    this.map = session.map;
    this.img = session.img;
    this.is_trash = session.is_trash;
    this.user_id = session.user_id;
};

Session.fetchSessionById = (id,result) => {
    let query = "SELECT *  FROM course_session LEFT JOIN users ON users.user_id = course_session.user_id where course_session.is_trash != 1 AND course_session.id = ?";
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

Session.fetchSessionOrderByUser = (id,user,result) => {
    let query = "SELECT *   FROM orders LEFT JOIN users ON users.user_id = orders.user_id  WHERE orders.session_id = ? AND users.email = ?";
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
Session.getNumberOfSeats = (id,result) => {
    let query = "SELECT COUNT(orders.id) AS totalSeatsTaken FROM orders WHERE orders.session_id = ?";
    sql.query(query,[id], (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
Session.deleteSession = (id,result) =>{
    let query = "SELECT COUNT(orders.id) AS totalSeatsTaken FROM orders WHERE orders.session_id = ?";
    sql.query(query,[id], (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        if (res.length == 0) {
            sql.query("UPDATE course_session SET is_trash = 1 WHERE id = ?",id,(err,res)=>{
                result(null,true)
            })
        }else{
            result(null,false)
        }
        
    });
}
module.exports = Session;