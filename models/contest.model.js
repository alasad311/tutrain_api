const sql = require("./db.js");

const Contest = function(contest) {
    this.startdate = contest.startdate;
    this.enddate = contest.enddate;
};
Contest.checkContest = (result) => {
    let query = "SELECT * FROM contest WHERE contest.startdate <= NOW() AND contest.enddate > NOW() ORDER BY id DESC LIMIT 0,1";
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
module.exports = Contest;