const sql = require("./db.js");
const admin = require('firebase-admin');
const messaging = admin.messaging()
const Orders = function(order) {
    this.course_id = order.course_id;
    this.tutor_id = order.tutor_id;
    this.paid_amount = order.paid_amount;
    this.order_number = order.order_number;
    this.user_id = order.user_id;
    this.is_online = order.is_online;
    this.book_id = order.book_id;
};
Orders.createOrder = (newOrder, result) => {
    let tutorToken;
    let userFullname;
    sql.query("SELECT * FROM users WHERE user_id = ?", newOrder.tutor_id, (err, res) => {
        tutorToken = res[0]['pushtoken'];
        sql.query("SELECT fullname FROM users WHERE user_id = ?", newOrder.user_id, (err, res) => {
            userFullname = res[0]['fullname'];
            sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                } else {
                    var payload = {
                        token: tutorToken,
                        notification: {
                            title: 'New Order',
                            body: userFullname + 'has place an order check it out now',
                        },
                        data: {
                            type: "NEWORDER",
                            orderID: "" + res.insertId,
                        }
                    }
                    messaging.send(payload)
                        .then((result) => {
                            console.log(result)
                        })
                    console.log("users: ", res);
                    result(null, { id: res.insertId, ...newOrder });
                }

            });
        });
    });


};
module.exports = Orders;