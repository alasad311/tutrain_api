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