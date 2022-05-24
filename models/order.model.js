const sql = require("./db.js");

const Orders = function(order) {
    this.course_id = order.course_id;
    this.tutor_id = order.tutor_id;
    this.paid_amount = order.paid_amount;
    this.order_number = order.order_number;
    this.user_id = order.user_id;
};
Orders.createOrder = (newOrder, result) => {
    sql.query("INSERT INTO users SET ?", newOrder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, { id: res.insertId, ...newOrder });
    });
};
module.exports = Orders;