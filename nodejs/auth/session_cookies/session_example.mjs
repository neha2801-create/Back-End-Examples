//Example adapted from https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
import express from "express"
import session from "express-session"
import {config} from "dotenv"
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
config()

const app = express(), port = process.env.PORT || 8080

//Example username and password (should be stored in a database)
const myusername = 'Tommy'
const mypassword = 'W3bD3v'

//Example session (should be stored in a database)
var sessionStore;

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }, //One hour expiration
    resave: false
}))
// parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serve the views
app.use(express.static("views"));

//Landing page
app.get('/',(req,res) => {
    sessionStore=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.redirect("/login.html")
});

//Login
app.post('/login',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        sessionStore=req.session;
        sessionStore.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.redirect("bad_login.html");
    }
})

//Delete session
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(port, () => console.log(`http://localhost:${port}`))