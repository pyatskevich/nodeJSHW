const fs = require('fs');
const _ = require('lodash');
const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy  = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const models = require('./models');
const csv = require('csvtojson');

//mongo
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const MongoClient = mongodb.MongoClient;
var db = mongoose.createConnection('mongodb://localhost:27017/nodejs');

var User = new mongoose.Schema({
    username   : { type: String, required: true }
    , age     : { type: Number, min: 5, max: 20 }
});
mongoose.model('Users', User);
var Users = db.model('Users');


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


app.get('/', checkToken, function(req, res, next) {
    models.products.findAll().then(products => {
        res.end(JSON.stringify(products, null, 2));
    });
});

app.get('/cities', async function(req, res, next) {
    const users = await Users.find();
    res.end(users.toString())
});

app.post('/cities', async function(req, res, next) {
    const result = await Users.collection.save({
        username: 'test11',
        age: 50
    });
    res.end(result.toString())

});
app.put('/cities/:id', async function(req, res, next) {
    const id = req.params.id;
    const users = await Users.find({id});
    users.username = 'newName';
    const result = await Users.collection.update(users);
    res.end(result.toString());

});

app.delete('/cities/:id', async function(req, res, next) {
    const id = req.params.id;
    const users = await Users.find({id});
    const result = await Users.collection.delete(users);
    res.end(result.toString());

});
app.get('/products/:id/reviews', function(req, res, next) {
    res.end('productsidreviews');
});
app.get('/products/:id', function(req, res, next) {
    models.products.findById(req.params.id).then(products => {
        res.end(JSON.stringify(products, null, 2));
    });
});

app.delete('/users/:id', function(req, res, next) {
    models.users.delete(req.params.id).then(products => {
        res.end(JSON.stringify(products, null, 2));
    });
});
app.get('/products', checkToken, function(req, res, next) {
    models.products.findAll().then(products => {
        res.end(JSON.stringify(products, null, 2));
    });
});
app.get('/uplodadProducts', checkToken, (req, res, next) => {
    let products = [];
    csv()
        .fromFile('./data/MOCK_DATA.csv')
        .on('json', jsonObj => {
            products.push(jsonObj);
        })
        .on('done',() => {
            models.products.bulkCreate(products);
        })
});
app.post('/products', function(req, res, next) {
    res.end('postproducts');
});
app.get('/users', checkToken, function(reg, res, next) {
    models.users.findAll().then(users => {
        res.end(JSON.stringify(users, null, 2));
    });
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
            res.cookie('auth', token);
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
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    function(req, res) {
        res.redirect('/');
    });

app.use((req, res) => {
    res.send(404, 'Page not found')
});