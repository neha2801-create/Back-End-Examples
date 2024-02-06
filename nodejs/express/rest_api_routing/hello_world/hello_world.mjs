// Imports
import express from 'express' 
import { json } from 'body-parser'

// Instantiations
const app = express() 

// Configurations
app.set('port', process.env.PORT || 8080)

// Middleware
app.use(json())
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`)
  next()
})

app.use((req, res, next) => {
  if (req.query.api_key) {
    next()
  } else {
    res.status(401).send({msg: 'not authorized'})
  }
})

// Routes
app.get('/', (req, res)=>{
  res.send('hello world')
})

app.get('/account', (req, res) => {
  res.send({msg: 'account'})
})

app.post('/account', (req, res) => {
  console.log(req.body) //body parsed by body-parser
  res.send({msg: 'account'})
})

app.get('/transaction', (req, res) => {
  res.send({msg: 'transaction'})
})

// Error handlers

// Server bootup or server export
app.listen(app.get('port'), () => {
  console.log('Example app listening on port ' + app.get('port') + '!')
})
