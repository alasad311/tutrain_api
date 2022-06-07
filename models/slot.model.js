const sql = require("./db.js");
var admin = require("firebase-admin");

var serviceAccount = require("../tutrain-e774e-firebase-adminsdk-gxssy-62965fb283.json");
var fcm = new FCM(serverKey);
const Slots = function(slot) {
    this.user_id = slot.user_id;
    this.tutor_id = slot.tutor_id;
    this.slot = slot.slot;
    this.timefrom = slot.timefrom;
    this.timeto = slot.timeto;
    this.duration = slot.duration;
};
Slots.createSlot = (newSlot, result) => {
    sql.query("SELECT * FROM temp_booking WHERE user_id = ? AND tutor_id = ? AND slot = ? AND timefrom = ? AND timeto = ? AND duration = ? AND is_trash != 1 ", [newSlot.user_id, newSlot.tutor_id, newSlot.slot, newSlot.timefrom, newSlot.timeto, newSlot.duration], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let tutorToken;
        let userFullname;

        sql.query("SELECT pushtoken FROM users WHERE user_id = ?", newSlot.tutor_id, (err, res) => {
            tutorToken = res[0]['pushtoken'];
        });
        sql.query("SELECT fullname FROM users WHERE user_id = ?", newSlot.user_id, (err, res) => {
            userFullname = res[0]['fullname'];
        });
        if (res.length == 0) {
            sql.query("INSERT INTO temp_booking SET ?", newSlot, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                } else {
                    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
                        to: tutorToken,
                        //collapse_key: 'your_collapse_key',

                        notification: {
                            title: 'New Session Requested',
                            body: userFullname + ' has request a session on ' + newSlot.slot + " from: " + newSlot.timefrom + " to: " + newSlot.timeto + "\n Do you accpet?"
                        },

                        // data: { //you can send only notification or only data(or include both)
                        //     my_key: 'my value',
                        //     my_another_key: 'my another value'
                        // }
                    }

                    fcm.send(message, function(err, response) {
                        if (err) {
                            console.log("Something has gone wrong!")
                        } else {
                            console.log("Successfully sent with response: ", response)
                        }
                    })
                }

            });
        } else {
            result(null, { results: "duplicate" });
        }

    });


};
module.exports = Slots;