const sql = require("./db.js");

const Reports = function(report) {
    this.user_id = order.user_id;
    this.tutor_id = order.tutor_id;
    this.feedback = order.feedback;
    this.is_open = order.is_open;
    this.date_created = order.date_created;
};
Reports.createReport = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, { id: res.insertId, ...newOrder });
    });
};
module.exports = Reports;