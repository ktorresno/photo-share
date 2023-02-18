const express = require('express');
const app = new express();
const db = require('./models');
const logger = require('morgan');

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'Drew Loves Kinsta'
}));
// Any user logged in by default.
global.loggedIn = null;
app.use("*", (request, response, next) => { // Any route
  loggedIn = request.session.userId;
  next();
});
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded());
app.use(express.static('public'));
// Set the view Enging to ejs
app.set('view engine', 'ejs');

const PhotosRouter = require('./routes/PhotosRouter');
const UsersRouter = require('./routes/UsersRouter');
const CommentsRouter = require('./routes/CommentsRouter');
const PageRouter = require('./routes/PageRouter');
app.use('/images', PhotosRouter);
app.use('/comments', CommentsRouter);
app.use('/users', UsersRouter);
app.use('/', PageRouter);

//db
const sqlPort = 3307; // 3306 or 3307
app.listen(sqlPort, () => {
    console.log(`Mariadb Connection Successful - http://localhost:${sqlPort}.`);
});

//server
const port = 8080;
db.sequelize
    .sync() // { force: true }
    .then(() => {
        app.listen(port, ()=>{
            console.log(`Serving photo app on http://localhost:${port}`)
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database', error);
    });