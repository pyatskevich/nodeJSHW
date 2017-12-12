const http = require('http');
var url = require('url');
const server = new http.Server((req, res) => {
    console.log( req.method, req.url);

    var urlParsed = url.parse(req.url, true);
    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        res.end( urlParsed.query.message );
    }
});

server.listen(3000);