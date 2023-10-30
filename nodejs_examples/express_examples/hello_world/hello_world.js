// Imports
import express from 'express' 

// Instantiations
const app = express() 

// Configurations
app.set('port', process.env.PORT || 8080)

// Middleware

// Routes
app.get('/hello', (req, res)=>{
  res.send('hello world')
})

// Error handlers

// Bootup
app.listen(app.get('port'),() => {
  console.log(`Example app listening on port ${app.get('port')} + !`);
});
