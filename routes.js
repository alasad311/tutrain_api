const { route } = require("express/lib/application");
module.exports = app => {

    const users = require("./controllers/users.controller.js");
    const ads = require("./controllers/ads.controller.js");
    const category = require("./controllers/category.controller.js");
    const course = require("./controllers/course.controller.js");
    const search = require("./controllers/search.controller.js");
    const order = require("./controllers/order.controller.js");
    const report = require("./controllers/report.controller.js");
    const slot = require("./controllers/slot.controller.js");
    const setting = require("./controllers/setting.controller.js");
    const session = require("./controllers/session.controller.js");
    const rating = require("./controllers/rating.controller.js");
    const contest = require("./controllers/contest.controller.js");

    var router = require("express").Router();
    // Users
    router.post("/users", users.create);
    router.post("/users/login", users.loginUser);
    router.post("/users/resend", users.resendConfirmaton)
    router.get("/users/:email", users.getUserByEmail);
    router.get("/user/:id", users.getUserByID);
    router.post("/user/token", users.updateToken);
    router.get("/users/:refCode/invites", users.getInvites);
    router.get("/users/:id/orders/:page", users.getAllOrders);
    router.get("/users/:id/requests/:page/pending", users.getAllRequests);
    router.get("/users/:id/requests/:page/confirmed", users.getAllConfirmed);
    router.get("/users/:id/wallet", users.getUserWallet);
    router.get("/users/:id/delete", users.deleteUser);
    router.post("/users/:id/password", users.changePassword);
    router.get("/users/:id/all/sessions/:page", users.getAllSession);
    router.get("/users/:id/all/courses/:page", users.getAllCourses);
    router.get("/users/:email/order/courses", users.getAllCourseOrders);


    router.post("/users/upload", users.uploadProfile);
    router.post("/users/uploadbio", users.uploadBio);

    router.post("/payout/request", users.createPayoutRequest);
    //Ads
    router.get("/ads", ads.allAds);

    //Categories
    router.get("/category", category.allCategory)
    router.get("/category/:id/:page", category.getAllCourses)

    //Courses
    router.get("/courses/new/:email", course.allNewCourses)
    router.get("/courses/allnew/:page", course.fetchAllNewCoursesPaged)
    router.get("/course/:id", course.getCourseById)
    router.get("/course/sections/:id", course.getCourseSections)
    router.get("/course/paied/:id/:user", course.getPaidStatus)
    router.get("/course/trailer/:id/:user", course.getCourseTrailer)
    router.get("/course/delete/:id", course.deleteCourse)

    //Sessions
    router.get("/session/:id", session.getSessionById)
    router.get("/session/paied/:id/:user", session.getPaidStatus)
    router.get("/session/counter/:id", session.getNumberOfSeats)
    router.get("/session/delete/:id", session.deleteSession)
    router.get("/session/seats/:id", session.getAllSeats)

    router.post("/session/create", session.sessionCreate)
    router.post("/session/:id/upload", session.sessionUpload)
    router.post("/session/:id/update", session.sessionUpdate)

    //Search
    router.get("/search/all/:value/:page", search.searchAll);
    router.get("/search/users/:value/:page", search.searchUser);
    router.get("/search/courses/:value/:page", search.searchCourses);
    router.get("/search/sessions/:value/:page", search.searchSessions);
    router.get("/search/user/sessions/:value/:page", search.searchUserSessions);
    router.get("/search/user/courses/:value/:page", search.searchUserCourses);

    //Orders
    router.post("/order", order.createOrder)

    //Report User
    router.post("/report", report.createReport)

    //Setting
    router.get("/app/setting", setting.getServiceFees)

    //rating
    router.post('/rating/new', rating.createRating)

    //contest
    router.get('/contest', contest.checkContest)
    router.get('/contest/winner', contest.contestWinner)
    router.get('/contest/:id', contest.getQuestions)
    router.post('/contest/:id', contest.submitAnswer)
    router.get('/contest/:id/answered', contest.checkAnswererd)
    router.get('/contest/subscriptions', contest.getSubs)

    //Booking Personal Tutor
    router.post("/slot", slot.createSlot)
    router.post("/slot/cancel", slot.cancelSlot)
    router.post("/slot/update", slot.updateSlot)
    app.use('/api/v1/', router);
};