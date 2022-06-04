const sql = require("./db.js");

const Reports = function(report) {
    this.user_id = report.user_id;
    this.tutor_id = report.tutor_id;
    this.feedback = report.feedback;
    this.is_open = report.is_open;
    this.date_created = report.date_created;
};
Reports.createReport = (newOrder, result) => {
    sql.query("INSERT INTO reports SET ?", newOrder, (err, res) => {
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