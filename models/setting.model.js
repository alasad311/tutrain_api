const sql = require("./db.js");

const Setting = function(setting) {
    this.service_fees = setting.service_fees;
    this.is_precentage = setting.is_precentage;
};
Setting.getServiceFees = (result) => {
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