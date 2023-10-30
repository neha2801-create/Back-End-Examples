// Modified from an example provided by Azat Mardan

// Imports
import express from 'express' 
import { json } from 'body-parser'

// Instantiations
const app = express() 
var profile = {
  username: 'bolitj01',
  email: 'bolitj01@pfw.edu',
  url: 'http://users.pfw.edu/bolitj01/'
}

// Configurations
// Middleware
app.use(json())

// Routes
app.get('/profile', (req, res)=>{
  res.send(profile)
})
app.post('/profile', (req, res) => {
  profile = req.body
  res.status(201).send()
})
app.put('/profile', (req, res)=>{
  Object.assign(profile, req.body)
  res.status(204).send()
})
app.delete('/profile', (req, res)=>{
  profile ={}
  res.status(204).send()
})

// Error handlers

// Server bootup or server export
app.listen(process.env.PORT || 8080)
