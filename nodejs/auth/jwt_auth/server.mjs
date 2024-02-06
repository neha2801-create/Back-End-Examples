//Example adapted from https://github.com/WebDevSimplified/JWT-Authentication 
import {config} from "dotenv"
config()
import express, { json } from 'express'
const app = express()
import jsonwebtoken from "jsonwebtoken"
const { verify } = jsonwebtoken

app.use(json())

//Fake database of user posts
const posts = [
  {
    username: 'Tommy',
    title: 'Birthday'
  },
  {
    username: 'Haley',
    title: 'Anniversary'
  }
]

//Custom middleware to authenticate a user's token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  //Authorization header looks like "BEARER TOKEN_STRING"
  const token = authHeader && authHeader.split(' ')[1] //Just get "TOKEN_STRING" part
  if (token == null) return res.sendStatus(401) //UNAUTHORIZED status

  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403) //FORBIDDEN status
    req.user = user
    next()
  })
}

//authenticateToken is used as middleware for this GET request
app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

app.listen(3000, () => {console.log("Server started on 3000")})