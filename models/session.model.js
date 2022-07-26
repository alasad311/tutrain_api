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

Session.fetchSessionById = (id, result) => {
    let query = "SELECT *  FROM course_session LEFT JOIN users ON users.user_id = course_session.user_id where course_session.is_trash != 1 AND course_session.id = ?";
    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};

Session.fetchSessionOrderByUser = (id, user, result) => {
    let query = "SELECT *   FROM orders LEFT JOIN users ON users.user_id = orders.user_id  WHERE orders.session_id = ? AND users.email = ?";
    sql.query(query, [id, user], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
Session.getNumberOfSeats = (id, result) => {
    let query = "SELECT COUNT(orders.id) AS totalSeatsTaken FROM orders WHERE orders.session_id = ?";
    sql.query(query, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
Session.deleteSession = (id, result) => {
    let query = "SELECT COUNT(orders.id) AS totalSeatsTaken FROM orders WHERE orders.session_id = ?";
    sql.query(query, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res[0]['totalSeatsTaken'] == 0) {
            sql.query("UPDATE course_session SET is_trash = 1 WHERE id = ?", id, (err, res) => {
                result(null, true)
            })
        } else {
            result(null, false)
        }

    });
}
Session.sessionUpdate = (image, id, body, result) => {
    let details = "";
    if (body.sessionname) {
        details = ",session_name = '" + body.sessionname + "'";
    }
    if (body.sessionlocation) {
        details += ",location = '" + body.sessionlocation + "'";
    }
    if (body.sessiondescription) {
        details += ",description = '" + sanitizer.sanitize(body.sessiondescription).replace("'", '') + "'";
    }
    if (image) {
        details += ",img = 'https://tapp.scd.edu.om/uploads/" + image + "'";
    }
    if (body.sessiontag) {
        details += ",tags = '" + sanitizer.sanitize(body.sessiontag).replace("'", '') + "'";
    }
    if (body.sessionduration) {
        details += ",duration = '" + body.sessionduration + "'";
    }
    if (body.sessionagenda) {
        details += ",agenda = '" + body.sessionagenda + "'";
    }
    if (body.startdate) {
        details += ",startdate = '" + body.startdate + "'";
    }
    if (body.enddate) {
        details += ",enddate = '" + body.enddate + "'";
    }
    if (body.map) {
        details += ",map = '" + body.map + "'";
    }

    sql.query("UPDATE course_session SET id = ? " + details + " WHERE id = ? ", [id, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, { results: "success" });
    });
}
module.exports = Session;