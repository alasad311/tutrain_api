const sql = require("./db.js");

const Contest = function(contest) {
    this.startdate = contest.startdate;
    this.enddate = contest.enddate;
};
Contest.getServiceFees = (result) => {
    let query = "SELECT * FROM app_setting WHERE id = 0;";
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
module.exports = Setting;