const config = require('./config/config.json');
const { User, Product } = require('./models');
console.log(config.name);

const user = new User();
const product = new Product();