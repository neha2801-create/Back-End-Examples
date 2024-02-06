//Example adapted from https://medium.com/geekculture/cookies-with-express-js-nodemon-esm-cookie-parser-and-cookie-session-1ad3c77ad3d5
import express from "express"
import cookieParser from "cookie-parser"
import {config} from "dotenv"
config()

const app = express(), port = process.env.PORT || 8080
app.use(cookieParser(process.env.COOKIE_SECRET))
app.get("/cookie", (req, res) => {
    res
        .cookie("cs590", "Web Dev is very marketable!")
        .send("Check your cookies!")
})
app.get("/signed_cookie", (req, res) => {
    res
        .cookie("cs590_signed", "Signed cookies detect any changes by the client", {
            signed: true,
        })
        .send("Check your signed cookies, but don't change them!")
})

app.get("/cookie_list", (req, res) => {
    let cookieList = "";
    cookieList += "Cookies:<br>";
    for (let cookieName in req.cookies){
        cookieList += `${cookieName}: ${req.cookies[cookieName]}<br>`;
    }
    cookieList += "Signed Cookies:<br>";
    for (let cookieName in req.signedCookies){
        cookieList += `${cookieName}: ${req.signedCookies[cookieName]}<br>`;
    }
    res.send(cookieList);
})

app.delete("/delete_cookies", (req, res) => {
    res
        .clearCookie('cs590')
        .clearCookie('cs590_signed')
        .send("Cookies Deleted")
})
app.listen(port, () => console.log(`http://localhost:${port}`))