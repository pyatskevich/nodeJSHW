const fs = require('fs');
const _ = require('lodash');
const express = require('express');
//const routes = require('./routes');
//const user = require('./routes/user');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy  = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');

const app = express();

app.set('port', 3000);

http.createServer(app).listen(app.get('port'), () => {
    console.info(app.get('port'));
});

const checkToken = (req, res, next) => {

    let token = req.cookies.auth || req.body.token || req.query.token || req.headers['x-access-token'];

    if(token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if(err) {
                res.json({ succes: false, message: 'Failed to authenticate token.'})
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({success: false, message: 'No token provided'})
    }

};

app.use(bodyParser());
app.use(cookieParser());


app.get('/', checkToken, function(reg, res, next) {
    res.end('products');
});
app.get('/products/:id/reviews', function(reg, res, next) {
    res.end('productsidreviews');
});
app.get('/products/:id', function(reg, res, next) {
    res.end('productsid');
});
app.get('/products', checkToken, function(reg, res, next) {
    res.end('getproducts');
});
app.post('/products', function(reg, res, next) {
    res.end('postproducts');
});
app.get('/users', checkToken, function(reg, res, next) {
    res.end('users');
});
app.get('/auth', function(reg, res, next) {
    fs.readFile('templates/auth.html', 'utf-8', (err, data) => {
        res.end(data);
    });
});
app.post(
    '/auth',
    //passport.authenticate('facebook', { session: false }),
    function(req, res, next) {
        const fileData = fs.readFileSync('data/users.json', 'utf-8');

        const currentUser = _.find(JSON.parse(fileData).users, ['username', req.body.username]);
        if (_.isUndefined(currentUser)) {
            res.status(404).send({
                status: 404,
                message: "NOT FOUND",
                data: {}
            });
        } else {
            const token = jwt.sign({"user": currentUser.username}, 'secret', { expiresIn:3000 });
            res.cookie('auth', token)
            //res.send(token);

            res.json({
                status: 200,
                message: "OK",
                data: {
                    user: currentUser.username
                },
                token
            });
        }
    });

app.post(
    '/auth',
    //passport.authenticate('facebook', { session: false }),
    function(req, res, next) {
        const fileData = fs.readFileSync('data/users.json', 'utf-8');

        const currentUser = _.find(JSON.parse(fileData).users, ['username', req.body.username]);
        if (_.isUndefined(currentUser)) {
            res.status(404).send({
                status: 404,
                message: "NOT FOUND",
                data: {}
            });
        } else {
            const token = jwt.sign({"user": currentUser.username}, 'secret', { expiresIn:3000 });
            res.cookie('auth', token)
            //res.send(token);

            res.json({
                status: 200,
                message: "OK",
                data: {
                    user: currentUser.username
                },
                token
            });
        }
});

// passport.use(new Strategy(
//     function(username, password, done) {
//         const fileData = fs.readFileSync('data/users.json', 'utf-8');
//
//         const currentUser = _.find(JSON.parse(fileData).users, ['username', username]);
//         if (_.isUndefined(currentUser)) {
//             done(null, false, 'Wrong username');
//         }
//         done(null, currentUser);
//     }
// ));
const FACEBOOK_APP_ID = 1519194148165894;
const FACEBOOK_APP_SECRET = 'e8c715bd78016a54482436d9c7bd306a';
passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
    console.log("111111", JSON.stringify(111111, null, 2));
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    //passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
console.info(2222);
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.use((req, res) => {
    res.send(404, 'Page not found')
});