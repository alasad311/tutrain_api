const sql = require("./db.js");
const admin = require('firebase-admin');
const messaging = admin.messaging()
const Ratings = function(rating) {
    this.user_id = order.user_id;
    this.order_id = order.order_id;
    this.value = order.value;
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