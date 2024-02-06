//Example adapted from https://github.com/WebDevSimplified/nodejs-user-permissions/tree/master/after 
import express, { json } from 'express'
const app = express()
import { ROLE, users } from './fake_database.mjs'
import { authUser, authRole } from './basicAuth.mjs'
import projectRouter from './routes/projects.mjs'

app.use(json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', (req, res) => {
  res.send(`Home Page of ${req.user.name}`)
})

app.get('/dashboard', authUser, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})

//Get user from the "database" if they exist
function setUser(req, res, next) {
  const userId = req.body.userId
  if (userId) {
    req.user = users.find(user => user.id === userId)
  }
  next()
}

app.listen(3000, () => {console.log("Listening on 3000");})