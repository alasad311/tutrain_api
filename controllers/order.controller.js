const Orders = require("../models/order.model.js");
var path = require('path');

//Fetch all ads from DB
exports.createOrder = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }

    const Order = new Orders({
        course_id: req.body.course_id,
        tutor_id: req.body.tutor_id,
        paid_amount: req.body.paid_amount,
        user_id: req.body.user_id,
        is_online: req.body.is_online,
        book_id: req.body.book_id,
        service_fees: req.body.service_fees,
        session_id: req.body.session_id,
        subscription_id: req.body.subscription_id,
    });

    Orders.createOrder(Order, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}