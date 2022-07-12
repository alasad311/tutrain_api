const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
const port = 3000;
const cors = require('cors');
const users = require("./controllers/users.controller.js");
const admin = require('firebase-admin');
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/');
    },
    fileFilter: function (req, file, cb) {
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
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname).toLowerCase();
        const randamString = Math.random().toString(36).substring(2, 15) + Math.random().toString(23).substring(2, 5);
        callback(null, randamString + ".jpg");
    },
});
let upload = multer({ storage: storage });
const serviceAccount = require("./tutrain-e774e-firebase-adminsdk-gxssy-62965fb283.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
app.use(cors({
    origin: '*'
}));
app.use(morgan('combined'));
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/v1/users/upload", upload.single('tutrainPro'), (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const userID = req.headers['userid']

    if (token != "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611") {
        res.status(400).send({
            message: "UnAuthorized Access!"
        });
        return;
    }

    res.status(201).send({
        response: req.file.filename
    });

    // Create a new image model and fill the properties
    // let newImage = new Image();
    // newImage.filename = req.file.filename;
    // newImage.originalName = req.file.originalname;
    // newImage.desc = req.body.desc
    // newImage.save(err => {
    //     if (err) {
    //         return res.sendStatus(400);
    //     }
    //     res.status(201).send({ newImage });
    // });
});
app.use(express.static("www"));
require("./routes.js")(app);
app.get("/users/accpet/:code", users.confirmAccount)
app.get("/referral", users.addReferral)
app.listen(port, '0.0.0.0');
