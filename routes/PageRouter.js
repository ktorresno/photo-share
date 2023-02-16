const PageRouter = require('express').Router();
const db = require('../models');
//routes
PageRouter.get('/', (req, res) => {
    console.log("cookie for userId:", req.session.userId);
    if (req.session.userId) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
});

PageRouter.get("/photo", (request, response) => {
    console.log("/photo");
    if (request.session.userId) {
        response.render("photo");
    }  else {
        response.redirect('/login');
    }
});

PageRouter.get("/login", (request, response) => {
    console.log("LOGGIN IN!");
    response.render("login");
});

PageRouter.get("/signUp", (request, response) => {
    console.log("/signUp");
    response.render("signUp");
});

module.exports = PageRouter;