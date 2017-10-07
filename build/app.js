'use strict';

var _config = require('../config/config.json');

var _config2 = _interopRequireDefault(_config);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_config2.default.name);

var user = new _models.User();
var product = new _models.Product();