"use strict";

import config  from './config/config.json';
import models  from './models';

const user = new models.User();
const product = new models.Product();
const dirWatcher = new models.DirWatcher();
const importer = new models.Importer();
dirWatcher.watch('./data/MOCK_DATA.csv', 3000);
importer.import();
importer.importSync();
