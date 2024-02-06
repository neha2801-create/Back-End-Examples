//Example adapted from https://github.com/WebDevSimplified/JWT-Authentication 
import {config} from "dotenv"
config();
import express, { json } from 'express'
const app = express()
import jsonwebtoken from 'jsonwebtoken'
const { verify, sign } = jsonwebtoken

app.use(json())

//Fake database for refresh tokens
let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204) //NO CONTENT status
})

app.post('/login', (req, res) => {
  // Authenticate User

  const username = req.body.username
  const user = { name: username }

  const accessToken = generateAccessToken(user)
  const refreshToken = sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

//Created tokens should expire
function generateAccessToken(user) {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
}

app.listen(4000, () => {console.log("Server started on 4000")})