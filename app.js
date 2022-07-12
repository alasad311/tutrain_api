const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
const port = 3000;
const cors = require('cors');
const users = require("./controllers/users.controller.js");
const admin = require('firebase-admin');
const multer = require('multer');
let UPLOAD_PATH = 'uploads';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
let upload = multer({ storage: storage });
const serviceAccount = require("./tutrain-e774e-firebase-adminsdk-gxssy-62965fb283.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
app.use(cors({
    origin: '*'
}));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/v1/users/upload", upload.single('tutrainPro'), (req, res, next) => {

    res.status(201).send(req.file.filename);

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