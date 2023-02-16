const express = require("express");
const UsersRouter = express.Router();
const db = require("../models");
UsersRouter.use(express.urlencoded());
UsersRouter.use(express.json());
const bcrypt = require('bcryptjs');
const saltRounds = 10;

UsersRouter.route('/login')
.post((request, response)=>{
    console.log("username and passwd required: ", request.body);
    const password = request.body.password
    const username = request.body.username
    db.user.findOne({where: { username: username } })
        .then(async (user)=>{
            //response.send(user)
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        console.log("Logged in, user ID= ", user.id);
                        request.session.userId = user.id;
                        response.redirect('/');
                    } else {
                        response.redirect('/login');
                    }
                });
            }            
        }).catch(err=>{
            response.send('You don\'t have an account. Try signing up!')
        });
});

UsersRouter.route('/signUp')
.post(async (request, response)=>{
    // email, password, username
    const email = request.body.email
    const password = request.body.password
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const username = request.body.username

    db.user.create({email: email[0], password: encryptedPassword, username: username})
    .then((user) => {
      //response.send(user)
      response.redirect('/login');
    }).catch(err=>{
        err
    })
})

module.exports = UsersRouter;