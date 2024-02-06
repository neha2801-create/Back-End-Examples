import { createServer } from 'http';
import { parse } from 'url';
import { readFile } from 'fs';

createServer(function (req, res) {
  const q = parse(req.url, true);
  const path = q.pathname;
  const filename = __dirname + path;
  
  readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  

    if (path.endsWith(".html")){
      res.writeHead(200, {'Content-Type': 'text/html'});
    }
    else if (path.endsWith(".jpg")){
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
    }
    
    res.write(data);
    return res.end("File sent from node server!");
  });
}).listen(8080);
console.log("Ready to serve files.");