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
    this.service_fees = order.service_fees;
    this.session_id = order.session_id;
    this.subscription_id = order.subscription_id;
};
Orders.createOrder = (newOrder, result) => {
    let tutorToken;
    let userFullname;
    if (newOrder.course_id) {
        sql.query("SELECT users.pushtoken,courses.name  FROM users  LEFT JOIN courses ON courses.user_id = users.user_id  WHERE courses.id = ?", newOrder.course_id, (err, res) => {
            tutorToken = res[0]['pushtoken'];
            courseName = res[0]['name']
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
                                body: 'A user has bought your course ' + courseName,
                            },
                            data: {
                                type: "COURSEBOUGHT",
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
    } else if (newOrder.book_id){
        sql.query("SELECT * FROM users WHERE user_id = ?", newOrder.tutor_id, (err, res) => {
            tutorToken = res[0]['pushtoken'];
            sql.query("SELECT fullname FROM users WHERE user_id = ?", newOrder.user_id, (err, res) => {
                userFullname = res[0]['fullname'];
                sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
                    sql.query("SELECT * FROM temp_booking WHERE id = ?", newOrder.book_id, (err, ress) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        } else {
                            var payload = {
                                token: tutorToken,
                                notification: {
                                    title: 'New Order',
                                    body: userFullname + ' has place a session check it out for more details',
                                },
                                data: {
                                    type: "NEWORDER",
                                    userName: "" + userFullname,
                                    slotDate: "" + ress[0].fullslot

                                }
                            }
                            messaging.send(payload)
                                .then((result) => {
                                    console.log(result)
                                })
                            result(null, { id: res.insertId,fullSlot:ress[0].fullslot, ...newOrder });
                        }
                       
                    });

                    


                });
            });
        });
    }else if (newOrder.session_id) {
        sql.query("SELECT users.pushtoken,session_name  FROM users  LEFT JOIN course_session ON course_session.user_id = users.user_id  WHERE course_session.id = ?", newOrder.session_id, (err, res) => {
            tutorToken = res[0]['pushtoken'];
            courseName = res[0]['session_name']
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
                                body: 'A user has bought a seat for your session ' + courseName,
                            },
                            data: {
                                type: "NEWORDERSESSION",
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
    }else if(newOrder.subscription_id)
    {
        sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
            result(null, { id: res.insertId, ...newOrder });
        });
    }



};
module.exports = Orders;