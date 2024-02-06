import { createServer } from 'http';
import { config } from 'dotenv';

config();

const port = process.env.PORT || 8080;

createServer((_, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello world!\n');
    res.end();
}).listen(port);

console.log('server is up running on port ' + port);
