const { route } = require("express/lib/application");

module.exports = app => {

    const users = require("./controllers/users.controller.js");
    const ads = require("./controllers/ads.controller.js");
    const category = require("./controllers/category.controller.js");
    const course = require("./controllers/course.controller.js");

    var router = require("express").Router();
    // Users
    router.post("/users", users.create);
    router.post("/users/login", users.loginUser);
    router.post("/users/resend", users.resendConfirmaton)
    router.get("/users/:email", users.getUserByEmail);

    //Ads
    router.get("/ads",ads.allAds);

    //Categories
    router.get("/category",category.allCategory)

    //Courses
    router.get("/courses/new/:email",course.allNewCourses)

    app.use('/api/v1/', router);
  };