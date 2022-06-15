const sql = require("./db.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
// constructor
const User = function(user) {
    this.fullname = user.fullname;
    this.email = user.email;
    this.dateofbirth = user.dateofbirth;
    this.type = user.type;
    this.country = user.country;
    this.phone = user.phone;
    this.password = user.password;
    this.certificate = user.certificate;
    this.picture = user.picture;
    this.degree = user.degree;
    this.specialization = user.specialization;
    this.governorate = user.governorate;
    this.wilayat = user.wilayat;
    this.locality = user.locality,
        this.id_card = user.id_card;
    this.about = user.about;
    this.membership = user.membership;
    this.is_active = user.is_active;
    this.created_by = user.created_by;
    this.updated_on = user.updated_on;
    this.updated_by = user.updated_by;
    this.is_trash = user.is_trash;
    this.is_confirmed = user.is_confirmed;
    this.confirm_code = user.confirm_code;
    this.pushtoken = user.pushtoken;
};
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "mail.oman-dev.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    debug: true,
    logger: true,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
    auth: {
        user: "test@oman-dev.com", // generated ethereal user
        pass: ".Z)9n45+j8pQ", // generated ethereal password
    },
});
User.getAll = (result) => {
    let query = "SELECT * FROM users";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
};
User.create = (newUser, refCode, ip, result) => {
    newUser.password = securePassword(newUser.password);
    newUser.confirm_code = crypto.randomBytes(64).toString('hex');
    newUser.is_confirmed = 0
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created users: ", { id: res.insertId, ...newUser });
        var html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
            '<html xmlns="http://www.w3.org/1999/xhtml">' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
            '</head>' +
            '<body style="width: 100% !important; -webkit-text-size-adjust: none; margin: 0; padding: 0;">' +
            '<center>' +
            '<table id="backgroundTable" style="border-spacing: 0; border-collapse: collapse; font-family: proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; width: 100% !important; height: 100% !important; color: #4c4c4c; font-size: 15px; line-height: 150%; background: #ffffff; margin: 0; padding: 0; border: 0;">' +
            '<tr style="vertical-align: top; padding: 0;">' +
            '<td align="center" valign="top" style="vertical-align: top; padding: 0;">' +
            '<table id="templateContainer" style="border-spacing: 0; border-collapse: collapse; font-family: proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; width: 600px; color: #4c4c4c; font-size: 15px; line-height: 150%; background: #ffffff; margin: 40px 0; padding: 0; border: 0;">' +
            '<tr style="vertical-align: top; padding: 0;">' +
            '<td class="templateContainerPadding" align="center" valign="top" style="vertical-align: top; padding: 0 40px;">' +
            '<table id="templateContent" style="border-spacing: 0; border-collapse: collapse; font-family: proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; width: 100%; background: #ffffff; margin: 0; padding: 0; border: 0;">' +
            '<tr style="vertical-align: top; padding: 0;">' +
            '<td style="vertical-align: top; text-align: left; padding: 0;" align="left" valign="top">' +
            '<h1 id="logo" style="color: #6E5BAA; display: block; font-family: hybrea, proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; font-size: 32px; font-weight: 200; text-align: left; margin: 0 0 40px;" align="left"><img src="https://www0.assets.heroku.com/email/heroku-logo.png" alt="heroku" width="120" height="42" style="outline: none; text-decoration: none; border: 0;" /></h1>' +
            '<p style="margin: 20px 0;">Thanks for signing up with Tutrain! You must follow this link within 5 days of registration to activate your account:</p>' +
            '<p style="margin: 20px 0;"><a href="https://tapp.scd.edu.om/users/accpet/' + newUser.confirm_code + '" style="color: #6E5BAA;">https://tapp.scd.edu.om/users/accpet/' + newUser.confirm_code + '</a>' +
            '<p style="margin: 20px 0;">' +
            "Have fun, and don't hesitate to contact us with your feedback." +
            '</p>' +
            '<p style="margin: 20px 0;">' +
            'The Tutrain Team<br />' +
            '<a href="http://oman-dev.com" style="color: #6E5BAA;">http://oman-dev.com</a>' +
            '</p>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</center>' +
            '<style type="text/css">' +
            'body {' +
            'width: 100% !important;' +
            '}' +
            '.ReadMsgBody {' +
            'width: 100%;' +
            '}' +
            '.ExternalClass {' +
            'width: 100%;' +
            '}' +
            'body {' +
            '-webkit-text-size-adjust: none;' +
            '}' +
            'body {' +
            'margin: 0; padding: 0;' +
            '}' +
            'img {' +
            'border: 0; outline: none; text-decoration: none;' +
            '}' +
            '#backgroundTable {' +
            'height: 100% !important; margin: 0; padding: 0; width: 100% !important;' +
            '}' +
            '#backgroundTable {' +
            "color: #4c4c4c; background-color: #ffffff; font-family: proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; font-size: 15px; line-height: 150%;" +
            '}' +
            '@media (max-width: 540px) {' +
            '#templateContainer {' +
            'width: 100% !important;' +
            '}' +
            '#templateContainer .templateContainerPadding {' +
            ' padding: 0 5% !important;' +
            '}' +
            '}' +
            '</style>' +
            '</body>' +
            '</html>';

        const newUserID = res.insertId;
        sql.query("SELECT * FROM referral WHERE user_ip = ? ", ip, (err, ress) => {

            if (ress.length) {
                sql.query("UPDATE referral SET user_id = ?,user_ip = ? WHERE ref_code = ? AND user_ip = ? ", [newUserID, newUserID, ress[0].ref_code, ip])
            } else {
                sql.query("INSERT INTO referral(user_id,ref_code,user_ip) VALUES(?,?,?)", [newUserID, refCode, newUserID])
            }
        });
        sendEmail('test@oman-dev.com', newUser.email, "Confirm your account on Tutrain", html)
        result(null, { id: res.insertId, ...newUser });
    });
}
User.authenticateUser = (email, password, result) => {
    sql.query("SELECT * FROM users where email = ?", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            if (res[0].is_confirmed === 1) {
                console.log("users: ", validatePassword(password, res[0].password));

                result(null, { results: validatePassword(password, res[0].password), is_confirmed: true, user: res });
            } else {
                console.log("users: ", validatePassword(password, res[0].password));

                result(null, { results: validatePassword(password, res[0].password), is_confirmed: false, user: res });
            }

        } else {
            result(null, false)
        }

    });
}
User.resendCode = (email, result) => {
    sql.query("SELECT * FROM users where email = ? and is_confirmed = 0", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            var html = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                '<html xmlns="http://www.w3.org/1999/xhtml">' +
                '<head>' +
                '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
                '</head>' +
                '<body style="width: 100% !important; -webkit-text-size-adjust: none; margin: 0; padding: 0;">' +
                '<center>' +
                '<table id="backgroundTable" style="border-spacing: 0; border-collapse: collapse; font-family: proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; width: 100% !important; height: 100% !important; color: #4c4c4c; font-size: 15px; line-height: 150%; background: #ffffff; margin: 0; padding: 0; border: 0;">' +
                '<tr style="vertical-align: top; padding: 0;">' +
                '<td align="center" valign="top" style="vertical-align: top; padding: 0;">' +
                '<table id="templateContainer" style="border-spacing: 0; border-collapse: collapse; font-family: proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; width: 600px; color: #4c4c4c; font-size: 15px; line-height: 150%; background: #ffffff; margin: 40px 0; padding: 0; border: 0;">' +
                '<tr style="vertical-align: top; padding: 0;">' +
                '<td class="templateContainerPadding" align="center" valign="top" style="vertical-align: top; padding: 0 40px;">' +
                '<table id="templateContent" style="border-spacing: 0; border-collapse: collapse; font-family: proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; width: 100%; background: #ffffff; margin: 0; padding: 0; border: 0;">' +
                '<tr style="vertical-align: top; padding: 0;">' +
                '<td style="vertical-align: top; text-align: left; padding: 0;" align="left" valign="top">' +
                '<h1 id="logo" style="color: #6E5BAA; display: block; font-family: hybrea, proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; font-size: 32px; font-weight: 200; text-align: left; margin: 0 0 40px;" align="left"><img src="https://www0.assets.heroku.com/email/heroku-logo.png" alt="heroku" width="120" height="42" style="outline: none; text-decoration: none; border: 0;" /></h1>' +
                '<p style="margin: 20px 0;">Thanks for signing up with Tutrain! You must follow this link within 5 days of registration to activate your account:</p>' +
                '<p style="margin: 20px 0;"><a href="https://tapp.scd.edu.om/users/accpet/' + res[0].confirm_code + '" style="color: #6E5BAA;">https://tapp.scd.edu.om/users/accpet/' + res[0].confirm_code + '</a>' +
                '<p style="margin: 20px 0;">' +
                "Have fun, and don't hesitate to contact us with your feedback." +
                '</p>' +
                '<p style="margin: 20px 0;">' +
                'The Tutrain Team<br />' +
                '<a href="http://oman-dev.com" style="color: #6E5BAA;">http://oman-dev.com</a>' +
                '</p>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</center>' +
                '<style type="text/css">' +
                'body {' +
                'width: 100% !important;' +
                '}' +
                '.ReadMsgBody {' +
                'width: 100%;' +
                '}' +
                '.ExternalClass {' +
                'width: 100%;' +
                '}' +
                'body {' +
                '-webkit-text-size-adjust: none;' +
                '}' +
                'body {' +
                'margin: 0; padding: 0;' +
                '}' +
                'img {' +
                'border: 0; outline: none; text-decoration: none;' +
                '}' +
                '#backgroundTable {' +
                'height: 100% !important; margin: 0; padding: 0; width: 100% !important;' +
                '}' +
                '#backgroundTable {' +
                "color: #4c4c4c; background-color: #ffffff; font-family: proxima-nova, helvetica neue, helvetica, arial, geneva, sans-serif; font-size: 15px; line-height: 150%;" +
                '}' +
                '@media (max-width: 540px) {' +
                '#templateContainer {' +
                'width: 100% !important;' +
                '}' +
                '#templateContainer .templateContainerPadding {' +
                ' padding: 0 5% !important;' +
                '}' +
                '}' +
                '</style>' +
                '</body>' +
                '</html>';
            sendEmail('test@oman-dev.com', res[0].email, "Confirm your account on Tutrain", html)
            result(null, {
                sent: true
            });
        } else {
            result(null, {
                sent: false
            });
        }

    });
}
User.getUserEmail = (email, result) => {
    sql.query("SELECT * FROM users where is_confirmed = 1 AND email = ?", email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
}
User.getUserDetailsByID = (id, result) => {
    sql.query("SELECT * FROM users where is_confirmed = 1 AND user_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    });
}
User.updateToken = (id, token, result) => {
    sql.query("UPDATE users SET pushtoken = ? WHERE user_id = ?", [token, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        sql.query("SELECT * FROM users where user_id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("users: ", res);
            result(null, res);
        });
    });
}

User.confirmCode = (code, result) => {
    sql.query("SELECT * FROM users where confirm_code = ?", code, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            if (res[0].is_confirmed === 0) {
                sql.query("UPDATE users SET is_confirmed = 1 WHERE email = ?", res[0].email, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
                    result(null, { results: "confirmed" });
                });
            } else {
                console.log("users: already confirmed");
                result(null, { results: "exist" });
            }

        } else {
            result(null, false)
        }

    });
}
User.addReferral = (refCode, ip, result) => {
    sql.query("INSERT INTO referral(ref_code,user_ip) VALUES(?,?)", [refCode, ip], (err, res) => {
        if (err) {
            result(null, err);
            return;
        } else {
            result(null, true);
        }

    });
}
User.getInvites = (refCode, result) => {
    sql.query("SELECT COUNT(*) AS TotalInvites FROM referral WHERE ref_code = ? AND made_order = 1", refCode, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
}
User.getAllOrders = (id,page, result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 6;
    sql.query("SELECT * FROM orders LEFT JOIN courses ON courses.id = orders.course_id LEFT JOIN schedule ON schedule.tbooking_id = orders.book_id LEFT JOIN users ON users.user_id = schedule.tutor_id WHERE orders.user_id = ? ORDER BY orders.date DESC LIMIT ?,6", [id,offset], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
}
User.getAllRequests = (id,page, result) => {
    let offset = 0;
    if (page != 0)
        offset = page * 10;
    sql.query("SELECT * FROM users WHERE users.user_id = ?", [id], (err, res) => {

        if(res[0].type == "students")
        {
            sql.query("SELECT * FROM temp_booking LEFT JOIN users ON users.user_id = temp_booking.tutor_id WHERE temp_booking.is_accpeted = 1 AND temp_booking.user_id = ? ORDER BY temp_booking.datecreated DESC LIMIT ?,10",[id,offset], (err,ress) =>{
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                result(null, ress);
            })
        }else{

            sql.query("SELECT * FROM temp_booking LEFT JOIN users ON users.user_id = temp_booking.user_id WHERE temp_booking.is_accpeted = 0 AND temp_booking.tutor_id = ? ORDER BY temp_booking.datecreated DESC LIMIT ?,10",[id,offset], (err,ress) =>{
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                result(null, ress);
            })

        }

    });
}

function securePassword(password) {
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash;
};

function validatePassword(password, dbpassword) {
    const verified = bcrypt.compareSync(password, dbpassword);
    return verified;
};
async function sendEmail(from, to, sub, body) {
    let info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: sub, // Subject line
        html: body, // html body
    });
    return await info;
}
module.exports = User;