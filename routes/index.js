module.exports = function(app) {
    app.get('/auth', require('./auth').get);
    app.post('/auth', require('./auth').post);

};