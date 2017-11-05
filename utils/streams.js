const program = require('commander');
const fs = require('fs');
const through2 = require('through2');
const _ = require('lodash');
const csvtojson = require('csvtojson');
const path = require('path');

const inputOutput = (filePath) => {
    const reader = fs.createReadStream(filePath);
    reader.pipe(process.stdout);
};
const transformFile = (filePath) => {
    const name = path.basename(filePath).split('.');

    csvtojson()
       .fromFile(filePath)
       .pipe(fs.createWriteStream(`data/${name[0]}.json`))
};
const transform = () => {
    process.stdin
        .pipe(through2(function (chunk, enc, cb) {
            this.push(_.upperCase(chunk));
            cb();
        }))
        .pipe(process.stdout);
};
const httpClient = () => {
    console.info('httpClient');
    console.info(process.stdin);
};
const httpServer = () => {
    console.info('httpServer');
};
const printHelpMessage = () => {
    program.help();
};

const cssBundler = (path) => {
    const writer = fs.createWriteStream('css/bundle.css');
    readFiles(path, function(content) {
        writer.write(content);
    }, function(err) {
        throw err;
    });

};

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFileContent(content);
            });
        });
    });
}

program
    .version('0.0.1')
    .description('Nodejs mentoring program')
    .option('-a, --action <actionName>', 'Action')
    .option('-f, --file [filePath]', 'File')
    .option('-p, --path [path]', 'File path')
    .option('-h, --help', 'Show help')
    .parse(process.argv);

if (program.action === 'io' && program.file) {
    inputOutput(program.file);
} else if (program.action === 'tf' && program.file) {
    transformFile(program.file);
} else if (program.action === 't') {
    transform();
} else if (program.action === 'hc') {
    httpClient();
} else if (program.action === 'hs') {
    httpServer();
} else if (program.action === 'bundle-css') {
    cssBundler(program.path);
} else {
    printHelpMessage();
}




