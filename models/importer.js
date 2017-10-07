
import fs from 'fs';
class Importer{

    importAsync = async (path) => {
         return await fs.readFile(path, 'utf8', (err, data) => {

             console.info('import file after change');
             if(err) throw err;
             const result = data.split('\n')
                .map(str => str.split(','));
             return result;
        });

    };
    importSync = (path) => {
        fs.readFileSync(path, 'utf8').split('\n')
            .map(str => str.split(','));
    };
}

export default Importer;