const Slot = require("../models/slot.model.js");
var path = require('path');

//Fetch all ads from DB
exports.createSlot = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }

    const Slots = new Slot({
        user_id: req.body.user_id,
        tutor_id: req.body.tutor_id,
        slot: req.body.slot,
        timefrom: req.body.timefrom,
        timeto: req.body.timeto,
        duration: req.body.duration,
        fullslot: req.body.fullslot
    });

    Slot.createSlot(Slots, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}
exports.updateSlot = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }


    Slot.updateSlot(req.body.is_accpeted, req.body.bookid, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}