import {createServer} from "http";
import {getDate} from "./myfirstmodule.mjs";

createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("The date and time are currently: " + getDate());
    console.log(getDate());
    res.end();
}).listen(8080);
console.log("waiting on port 8080");
