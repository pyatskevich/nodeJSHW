const fs = require('fs');
require('http')
.createServer()
.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    const fileData = fs.readFileSync('http-servers/index.html', 'utf-8');
    const message = 'Hello world';
    const result = fileData.replace('{message}', message);
    res.end(result)
}).listen(3000);