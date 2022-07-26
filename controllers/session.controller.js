const Session = require("../models/session.model.js");

var path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './www/uploads/');
    },
    fileFilter: function(req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetyp = file.mimetype;
        if (
            extension !== '.jpg' ||
            extension !== '.jpeg' ||
            extension !== '.png' ||
            mimetyp !== 'image/png' ||
            mimetyp !== 'image/jpg' ||
            mimetyp !== 'image/jpeg'
        ) {
            cb('error message', true);
        }
    },
    filename: function(req, file, callback) {
        const extension = path.extname(file.originalname).toLowerCase();
        const randamString = Math.random().toString(36).substring(2, 15) + Math.random().toString(23).substring(2, 5);
        callback(null, randamString + extension);
    },
});
let upload = multer({ storage: storage }).single('tutrainSession');

exports.getSessionById = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Session.fetchSessionById(req.params.id, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}

exports.getPaidStatus = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Session.fetchSessionOrderByUser(req.params.id, req.params.user, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}
exports.getNumberOfSeats = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Session.getNumberOfSeats(req.params.id, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}
exports.deleteSession = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Session.deleteSession(req.params.id, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            result: data
        });
    });
}
exports.sessionUpload = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            res.status(200).send({
                code: err.code,
            });
        } else if (err) {
            res.status(200).send({
                code: err.code,
            });
        }
        if (req.file) {
            Session.sessionUpdate(req.file.filename, req.params.id, req.body, (err, data) => {
                if (err)
                    res.status(200).send({
                        code: err.code,
                    });
                else res.send({
                    response: data
                });
            });
        } else {
            Session.sessionUpdate(null, req.params.id, req.body, (err, data) => {
                if (err)
                    res.status(200).send({
                        code: err.code,
                    });
                else res.send({
                    response: data
                });
            });
        }
    })
}
exports.sessionUpdate = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }
    Session.sessionUpdate(null, req.params.id, req.body, (err, data) => {
        if (err)
            res.status(200).send({
                code: err.code,
            });
        else res.send({
            response: data
        });
    });
}