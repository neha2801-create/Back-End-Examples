//Educational-Use example adapted from https://github.com/WebDevSimplified/Nodejs-User-Authentication 
import express, { json } from 'express'
import { hash, verify } from 'argon2' //See https://www.npmjs.com/package/argon2 
import morgan from "morgan"
const app = express()

app.use(express.static("client")) //Serve all files in the client folder
app.use(json()) //Parse JSON data into request body
app.use(express.urlencoded({extended: true})) //Parse form data into request body
app.use(morgan("combined")) //Log any HTTP requests

const users = []

app.get('/users', (req, res) => {
  res.json(users)
})

//Create new user
app.post('/users/create', async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password)
    const newUser = { username: req.body.username, password: hashedPassword }
    users.push(newUser)
    console.log(`Created user:`, newUser)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

//Login with user credentials
app.post('/users/login', async (req, res) => {
  console.log(req.body)
  const user = users.find(user => user.username === req.body.username)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await verify(user.password, req.body.password)) {
      res.send('Successful login')
    } else {
      res.send('Incorrect credentials')
    }
  } catch {
    res.status(500).send()
  }
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server started on ${PORT}`))