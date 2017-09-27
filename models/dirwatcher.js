'use strict';
import fs from 'fs';
import EventEmitter from 'events';

class DirWatcher extends EventEmitter {
    watch = (path, delay) => {
        fs.watchFile( path, { interval: delay }, function ( curr, prev ) {

            console.info('file changes');
        });
    };
}

export default DirWatcher;