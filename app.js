const express = require('express');
//const routes = require('./routes');
//const user = require('./routes/user');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.set('port', 3000);

http.createServer(app).listen(app.get('port'), () => {
    console.info(app.get('port'));
});


app.use(bodyParser());
app.use(cookieParser());
app.get('/', function(reg, res, next) {
    res.end('products');
});
app.get('/products/:id/reviews', function(reg, res, next) {
    res.end('productsidreviews');
});
app.get('/products/:id', function(reg, res, next) {
    res.end('productsid');
});
app.get('/products', function(reg, res, next) {
    res.end('getproducts');
});
app.post('/products', function(reg, res, next) {
    res.end('postproducts');
});
app.get('/users', function(reg, res, next) {
    res.end('users');
});
app.get('/auth', function(reg, res, next) {
    res.end('auth');
});

app.use((req, res) => {
    res.send(404, 'Page not found')
});