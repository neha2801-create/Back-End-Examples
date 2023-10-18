// Imports
import express from 'express' 

// Instantiations
const app = express() 

// Configurations
app.set('port', process.env.PORT || 8080)

// Middleware
app.use((req, res, next) => {
  console.log(`${req.method}:${req.url}`)
  next()
})

app.use((req, res, next) => {
  if ( req.query.api_key ) {
    next()
  }
  else {
    res.status(401).send({msg: 'not authorized'})
  }
})


// Routes
app.get('/', (req, res)=>{
  res.send('hello world')
})


// Error handlers

// Bootup
app.listen(app.get('port'),() => {
  console.log('Example app listening on port ' + app.get('port') + '!');
});
