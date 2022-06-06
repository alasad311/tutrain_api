const sql = require("./db.js");

const Slots = function(slot) {
    this.user_id = slot.user_id;
    this.tutor_id = slot.tutor_id;
    this.slot = slot.slot;
    this.timefrom = slot.timefrom;
    this.timeto = slot.timeto;
    this.duration = slot.duration;
};
Slots.createSlot = (newSlot, result) => {
    sql.query("SELECT * FORM temp_booking WHERE user_id = ? AND tutor_id = ? AND slot = ? AND timefrom = ? AND timeto = ? AND duration = ? ",[newSlot.user_id,newSlot.tutor_id,newSlot.slot,newSlot.timefrom,newSlot.timeto,newSlot.duration], (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        console.log("users: ", res);
        result(null, res);
    });

    sql.query("INSERT INTO temp_booking SET ?", newSlot, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, { id: res.insertId, ...newSlot });
    });
};
module.exports = Slots;