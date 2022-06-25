const sql = require("./db.js");
const admin = require('firebase-admin');
const messaging = admin.messaging()
const Ratings = function(rating) {
    this.user_id = rating.user_id;
    this.order_id = rating.order_id;
    this.value = rating.value;
};
Ratings.createOrder = (newRating, result) => {
    sql.query("INSERT INTO rating SET ?", newRating, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else {
            result(null, { id: res.insertId, ...newRating });
        }

    });

};
module.exports = Ratings;