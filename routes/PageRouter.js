const PageRouter = require('express').Router();
const { response } = require('express');
const db = require('../models');
//routes
PageRouter.get('/', (req, res) => {
    console.log("cookie for userId:", req.session.userId);
    if (req.session.userId) {
        db.photo.findAll()
        .then((photos) => {
            console.log("GET IMAGES");
            res.render("index", {data: photos});
        })
        .catch( (error) => {
            res.send(error);
        });
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

PageRouter.get("/logout", (request, response) => {
    console.log("logging out");
    request.session.destroy(() => {
        response.redirect("/login");
    });
});

module.exports = PageRouter;