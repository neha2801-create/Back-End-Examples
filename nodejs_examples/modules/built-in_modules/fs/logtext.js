import {readFile} from "fs";

readFile("sample.txt", "utf-8", function (err, data) {
    console.log(data);
});