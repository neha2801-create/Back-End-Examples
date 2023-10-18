import { createServer } from 'http';
import formidable from 'formidable';
import { rename } from 'fs';

//How to use __dirname in modern ES modules
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

createServer(function (req, res) {
  if (req.url == '/fileupload') {
    const form = formidable({});

    form.parse(req, function (err, fields, files) {
      const oldpath = files.filetoupload.path;
      const newpath = __dirname + '/temp/' + files.filetoupload.name;

      rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    
    return res.end();
  }
}).listen(8080);
console.log("Waiting on port 8080");