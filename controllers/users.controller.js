const Users = require("../models/users.model.js");
var path = require('path');
var useragent = require('express-useragent');
// Create and Save a new User

exports.create = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }

    // Create a User
    const user = new Users({
        fullname: req.body.fullname,
        email: req.body.email,
        dateofbirth: req.body.dateofbirth,
        type: req.body.type,
        country: req.body.country,
        phone: req.body.phone,
        password: req.body.password,
        certificate: req.body.certificate,
        picture: req.body.picture,
        degree: req.body.degree,
        specialization: req.body.specialization,
        governorate: req.body.governorate,
        locality: req.body.locality,
        wilayat: req.body.wilayat,
        id_card: req.body.id_card,
        about: req.body.about,
        pushtoken: req.body.pushtoken,
        membership: 0,
        is_active: 1,
        created_by: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        is_trash: 0
    });
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // Save User in the database
    Users.create(user, req.body.refCode, ip, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send(data);
    });
};

//Look for user via email and login the user
exports.loginUser = (req, res) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
            res.status(400).send({
                message: "UnAuthorized Access!"
            });
            return;
        }
        Users.authenticateUser(req.body.email, req.body.password, (err, data) => {
            if (err)
                res.status(200).send({
                    code: err.code,
                });
            else res.send({
                response: data
            });
        });
    }
    //resend confirmation email back to user
exports.resendConfirmaton = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.resendCode(req.body.email, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}
exports.confirmAccount = (req, res) => {

    Users.confirmCode(req.params.code, (err, data) => {
        if (err) {
            res.sendFile(path.join(__dirname, '../www', 'error.html'));
        } else {
            if (data.results === "confirmed") {
                res.redirect("/openlogin/?login=success");
            } else if (data.results === "exist") {
                res.redirect("/openlogin/?login=success");
            } else if (data === false) {
                res.sendFile(path.join(__dirname, '../www', 'code.html'));
            }
        }
    });
}
exports.updateToken = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.updateToken(req.body.user_id, req.body.pushtoken, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}

exports.getAllSession = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.getAllSession(req.params.id, req.params.page, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}

exports.getUserByEmail = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.getUserEmail(req.params.email, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}
exports.getUserByID = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.getUserDetailsByID(req.params.id, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}
exports.addReferral = (req, res) => {
    const refCode = req.query.ref;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    var source = req.headers['user-agent'];
    ua = useragent.parse(source);
    if (ua.isMobile) {
        Users.addReferral(refCode, ip, (err, data) => {
            if (ua.isAndroid) {
                res.redirect('https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en&gl=US')
            } else {
                res.redirect('https://apps.apple.com/us/app/facebook/id284882215')
            }
        })
    } else {
        res.redirect('/')
    }

}
exports.getInvites = (req, res) => {
    const refCode = req.params.refCode;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.getInvites(refCode, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });

}
exports.getAllOrders = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const userID = req.params.id;
    const page = req.params.page;
    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.getAllOrders(userID, page, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });

}
exports.getAllRequests = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const userID = req.params.id;
    const page = req.params.page;
    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.getAllRequests(userID, page, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });

}
exports.getAllConfirmed = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const userID = req.params.id;
    const page = req.params.page;
    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.getAllConfirmed(userID, page, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });

}
exports.getUserWallet = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const userID = req.params.id;
    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.getUserWallet(userID, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });

}
exports.createPayoutRequest = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.createPayoutRequest(req.body.user_id, req.body.amount, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });

}
exports.deleteUser = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Users.deleteUser(req.params.id, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });

}