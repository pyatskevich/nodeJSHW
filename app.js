
import models  from './models';

const dirWatcher = new models.DirWatcher();
const importer = new models.Importer();
dirWatcher.watch('./data/MOCK_DATA.csv', 3000, importer.importAsync);