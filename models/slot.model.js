const sql = require("./db.js");
const admin = require('firebase-admin');
const serviceAccount = require("../tutrain-e774e-firebase-adminsdk-gxssy-62965fb283.json");

const Slots = function(slot) {
    this.user_id = slot.user_id;
    this.tutor_id = slot.tutor_id;
    this.slot = slot.slot;
    this.timefrom = slot.timefrom;
    this.timeto = slot.timeto;
    this.duration = slot.duration;
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const messaging = admin.messaging()
Slots.createSlot = (newSlot, result) => {
    sql.query("SELECT * FROM temp_booking WHERE user_id = ? AND tutor_id = ? AND slot = ? AND timefrom = ? AND timeto = ? AND duration = ? AND is_trash != 1 ", [newSlot.user_id, newSlot.tutor_id, newSlot.slot, newSlot.timefrom, newSlot.timeto, newSlot.duration], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let tutorToken;
        let userFullname;
        if (res.length == 0) {
            sql.query("SELECT pushtoken FROM users WHERE user_id = ?", newSlot.tutor_id, (err, res) => {
                tutorToken = res[0]['pushtoken'];
                sql.query("SELECT fullname FROM users WHERE user_id = ?", newSlot.user_id, (err, res) => {
                    userFullname = res[0]['fullname'];
                    sql.query("INSERT INTO temp_booking SET ?", newSlot, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        } else {
                            var payload = {
                                    token: tutorToken,
                                    notification: {
                                        title: 'New Session Requested',
                                        body: userFullname + ' has request a session on ' + newSlot.slot + " from: " + newSlot.timefrom + " to: " + newSlot.timeto,
                                    }
                                };
                            messaging.send(payload)
                            .then((result) => {
                                console.log(result)
                            })
                            console.log("users: ", res);
                            result(null, { id: res.insertId, ...newSlot });
                        }
                        
                    });
                });
            });
            
        } else {
            result(null, { results: "duplicate" });
        }

    });


};
module.exports = Slots;