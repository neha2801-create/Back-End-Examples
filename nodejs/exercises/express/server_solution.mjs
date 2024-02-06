import express from "express";
import { appendFile } from "fs";

const app = express();

import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url); 
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// app.use(express.static("images"))
app.use(express.json());

app.get("/", (req, res) => {
    res.send("/Welcome home!")
})

app.get("/image", (req, res) => {
    res.sendFile(__dirname + "images/cats.gif");
})

app.post("/signup", (req, res) => {
    let user = req.body;
    let userText = JSON.stringify(user);
    console.log(`Writing ${userText} to users.txt`);

    appendFile('users.txt', `${userText}\n`, (err) => {
        if (err) throw err;
    });

    res.send("User saved");
})

app.listen(4000, () => {
    console.log("Server listening on port 4000");
}
);