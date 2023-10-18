import { createServer } from "http";
const server = createServer();
const port = 8080;

function handler(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello CS590!');
    res.end();
}

server.on('request', handler);
server.listen(port);

console.log('server is up running on port ' + port);