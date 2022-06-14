const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
const port = 3000;
const cors = require('cors');
const users = require("./controllers/users.controller.js");

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
router.get("/referral/",users.refAdd)
app.listen(port, '0.0.0.0');