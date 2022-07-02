const sql = require("./db.js");
const nested = require("node-mysql-nesting")

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
Contest.getSubs = (result) => {
    let query = "SELECT * FROM subscriptions WHERE subscriptions.is_trash != 1";
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
Contest.getQuestions  = (id,result) => {
    let query = "SELECT * FROM contest LEFT JOIN contest_question ON contest_question.contest_id = contest.id LEFT JOIN question_choice ON question_choice.question_id = contest_question.id WHERE contest.id = ?  ";
    var options = { sql: query, nestTables: true };
    var nestingOptions = [
        { tableName : 'contest', pkey: 'id'},
        { tableName : 'contest_question', pkey: 'id', fkeys:[{table:'contest',col:'contest_id'}]},
        { tableName : 'question_choice', pkey: 'id', fkeys:[{table:'contest_question',col:'question_id'}]},
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
Contest.checkAnswererd  = (id,userid,result) => {
    let query = "SELECT * FROM user_answer WHERE user_answer.user_id = ? AND user_answer.contest_id = ?";
    sql.query(query, [userid,id], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if(res.length){result(null, true);}else{result(null, false);}

        
    });
};
Contest.submitAnswer = (answerID,contestID,userID,result) => {
    let query = "INSERT INTO user_answer(user_id,contest_id,answer_id) VALUES(?,?,?)";
    sql.query(query, [userID,contestID,answerID], (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        if(res.length){result(null, true);}else{result(null, false);}

        
    });
};
module.exports = Contest;