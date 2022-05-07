module.exports = app => {

    const users = require("./controllers/users.controller.js");
    const ads = require("./controllers/ads.controller.js");
    var router = require("express").Router();
    // Create a new Users
    router.post("/users", users.create);
    router.post("/users/login", users.loginUser);
    router.post("/users/resend", users.resendConfirmaton)
    router.get("/ads",ads.getAllAds);
    app.use('/api/v1/', router);
  };