'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fs = require('fs');
var _ = require('lodash');
var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
var models = require('./models');
var csv = require('csvtojson');

//mongo
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var MongoClient = mongodb.MongoClient;
var db = mongoose.createConnection('mongodb://localhost:27017/nodejs');

var User = new mongoose.Schema({
    username: { type: String, required: true },
    age: { type: Number, min: 5, max: 20 }
});
mongoose.model('Users', User);
var Users = db.model('Users');

var app = express();
app.set('port', 6000);
http.createServer(app).listen(app.get('port'), function () {
    console.info(app.get('port'));
});

var checkToken = function checkToken(req, res, next) {

    var token = req.cookies.auth || req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'secret', function (err, decoded) {
            if (err) {
                res.json({ succes: false, message: 'Failed to authenticate token.' });
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ success: false, message: 'No token provided' });
    }
};

app.use(bodyParser());
app.use(cookieParser());

app.get('/files', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());
app.post('/files', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());
app.get('/', checkToken, function (req, res, next) {
    models.products.findAll().then(function (products) {
        res.end(JSON.stringify(products, null, 2));
    });
});

app.get('/cities', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var users;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return Users.find();

                    case 2:
                        users = _context3.sent;

                        res.end(users.toString());

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}());

app.post('/cities', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return Users.collection.save({
                            username: 'test11',
                            age: 50
                        });

                    case 2:
                        result = _context4.sent;

                        res.end(result.toString());

                    case 4:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function (_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
    };
}());
app.put('/cities/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
        var id, users, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        id = req.params.id;
                        _context5.next = 3;
                        return Users.find({ id: id });

                    case 3:
                        users = _context5.sent;

                        users.username = 'newName';
                        _context5.next = 7;
                        return Users.collection.update(users);

                    case 7:
                        result = _context5.sent;

                        res.end(result.toString());

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function (_x13, _x14, _x15) {
        return _ref5.apply(this, arguments);
    };
}());

app.delete('/cities/:id', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
        var id, users, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        id = req.params.id;
                        _context6.next = 3;
                        return Users.find({ id: id });

                    case 3:
                        users = _context6.sent;
                        _context6.next = 6;
                        return Users.collection.delete(users);

                    case 6:
                        result = _context6.sent;

                        res.end(result.toString());

                    case 8:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function (_x16, _x17, _x18) {
        return _ref6.apply(this, arguments);
    };
}());
app.get('/products/:id/reviews', function (req, res, next) {
    res.end('productsidreviews');
});
app.get('/products/:id', function (req, res, next) {
    models.products.findById(req.params.id).then(function (products) {
        res.end(JSON.stringify(products, null, 2));
    });
});

app.delete('/users/:id', function (req, res, next) {
    models.users.delete(req.params.id).then(function (products) {
        res.end(JSON.stringify(products, null, 2));
    });
});
app.get('/products', checkToken, function (req, res, next) {
    models.products.findAll().then(function (products) {
        res.end(JSON.stringify(products, null, 2));
    });
});
app.get('/uplodadProducts', checkToken, function (req, res, next) {
    var products = [];
    csv().fromFile('./data/MOCK_DATA.csv').on('json', function (jsonObj) {
        products.push(jsonObj);
    }).on('done', function () {
        models.products.bulkCreate(products);
    });
});
app.post('/products', function (req, res, next) {
    res.end('postproducts');
});
app.get('/users', checkToken, function (reg, res, next) {
    models.users.findAll().then(function (users) {
        res.end(JSON.stringify(users, null, 2));
    });
});
app.get('/auth', function (reg, res, next) {
    fs.readFile('templates/auth.html', 'utf-8', function (err, data) {
        res.end(data);
    });
});
app.post('/auth',
//passport.authenticate('facebook', { session: false }),
function (req, res, next) {
    var fileData = fs.readFileSync('data/users.json', 'utf-8');

    var currentUser = _.find(JSON.parse(fileData).users, ['username', req.body.username]);
    if (_.isUndefined(currentUser)) {
        res.status(404).send({
            status: 404,
            message: "NOT FOUND",
            data: {}
        });
    } else {
        var token = jwt.sign({ "user": currentUser.username }, 'secret', { expiresIn: 3000 });
        res.cookie('auth', token);
        res.json({
            status: 200,
            message: "OK",
            data: {
                user: currentUser.username
            },
            token: token
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
var FACEBOOK_APP_ID = 1519194148165894;
var FACEBOOK_APP_SECRET = 'e8c715bd78016a54482436d9c7bd306a';
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
}, function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
    });
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', function (req, res) {
    res.redirect('/');
});

app.use(function (req, res) {
    res.send(404, 'Page not found');
});