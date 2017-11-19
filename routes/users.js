const fs = require('fs');
exports.get = function(req, res) {
    res.render('users');
};

exports.post = function(req, res, next) {
    const { username, password } = req.body;
    const file = fs.readFile('data/users.json', 'utf-8');
    console.log("file", JSON.stringify(file, null, 2));
};