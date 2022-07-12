const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
const port = 3000;
const cors = require('cors');
const users = require("./controllers/users.controller.js");
const admin = require('firebase-admin');

const serviceAccount = require("./tutrain-e774e-firebase-adminsdk-gxssy-62965fb283.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));
// Enable preflight requests for all routes
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("www"));
require("./routes.js")(app);
app.get("/users/accpet/:code", users.confirmAccount)
app.get("/referral", users.addReferral)
app.listen(port, '0.0.0.0');