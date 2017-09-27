"use strict";

import fs from 'fs';
import csvParse from 'csv-parse';

class Importer {

    import = async () => {
         await fs.readFile('data/MOCK_DATA.CSV', 'utf8', (err, data) => {

            if(err) throw err;
            const result = data.split('\n')
                .map(str => str.split(','));
            return result;
        });

    };
    importSync = () => {
        const result = fs.readFileSync('data/MOCK_DATA.CSV', 'utf8').split('\n')
            .map(str => str.split(','));
    };
}

export default Importer;