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
                                },
                                data: {
                                    type: "NEWSESSION",
                                    bookID: "" + res.insertId,
                                    userFullName: "" + userFullname,
                                    slotDate: "" + newSlot.slot,
                                    timeFrom: "" + newSlot.timefrom,
                                    timeTo: "" + newSlot.timeto,
                                },
                                actions: [
                                    {
                                        action: "explore",
                                        title: "Checkout", 
                                    }
                                ]
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
Slots.updateSlot = (accpeted, id, result) => {
    sql.query("UPDATE temp_booking SET is_accpeted = ? WHERE temp_booking.id = ?", [accpeted, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        let data;
        let tutorToken;
        let userFullname;
        let tutorID;
        sql.query("SELECT * FROM temp_booking where temp_booking.id = ?", id, (err, res) => {
            data = res;
            sql.query("SELECT pushtoken FROM users WHERE user_id = ?", data[0]['user_id'], (err, res) => {
                tutorToken = res[0]['pushtoken'];
                sql.query("SELECT fullname FROM users WHERE user_id = ?", data[0]['tutor_id'], (err, res) => {
                    userFullname = res[0]['fullname'];
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    } else {
                        let status = "";
                        if (accpeted)
                            status = "Accepted";
                        else
                            status = "Rejected";

                        var payload = {
                            token: tutorToken,
                            notification: {
                                title: 'Session ' + status,
                                body: userFullname + ' has ' + status + ' your session on ' + data[0]['slot'] + " this order will be cancelled within 2 hours of no payment method",
                            },
                            data: {
                                type: "SESSIONRESPONSE",
                                accpeted: status,
                                bookID: "" + data[0]['id'],
                                userFullName: "" + userFullname,
                                slotDate: "" + data[0]['slot'],
                                timeFrom: "" + data[0]['timefrom'],
                                timeTo: "" + data[0]['timeto'],
                            }
                        };
                        messaging.send(payload)
                            .then((result) => {
                                console.log(result)
                            })
                        console.log("users: ", res);
                        result(null, { status: "updated" })
                    }
                });
            });
        });

    })
}
module.exports = Slots;