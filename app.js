"use strict";

import config  from './config/config.json';
import models  from './models';
console.log(config.name);

const user = new models.User();
const product = new models.Product();