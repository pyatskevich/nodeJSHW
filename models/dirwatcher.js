'use strict';
import fs from 'fs';

class DirWatcher {
    watch = (path, delay, callback) => {
        fs.watchFile( path, { interval: delay }, () => {
            callback(path);
        });
    };
}

export default DirWatcher;